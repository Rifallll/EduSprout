# scraper.py
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json, time, random, hashlib, urllib.robotparser
from datetime import datetime

HEADERS = {"User-Agent":"Mozilla/5.0 (EduScraper/1.0)"}
DELAY_MIN, DELAY_MAX = 0.8, 1.6
OUTPUT_FILE = "data/beasiswa.json"

def allowed(url):
    try:
        p = urlparse(url)
        robots_url = f"{p.scheme}://{p.netloc}/robots.txt"
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(HEADERS["User-Agent"], url)
    except Exception:
        return True

def safe_get(url, timeout=15):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout)
        if r.status_code == 200:
            return r.text
    except Exception:
        pass
    return ""

def make_id(source, title, link):
    s = f"{source}|{title}|{link}"
    return hashlib.sha1(s.encode("utf-8")).hexdigest()

# --------- beasiswa.id ---------
def scrape_beasiswa_id(limit=30):
    source = "beasiswa.id"
    base = "https://beasiswa.id"
    html = safe_get(base)
    if not html: return []
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article") or soup.select(".post")
    out = []
    for p in posts[:limit]:
        a = p.select_one("h2.entry-title a") or p.select_one("a")
        if not a: continue
        title = a.get_text(strip=True)
        link = urljoin(base, a.get("href"))
        date_el = p.select_one("time")
        date = date_el.get("datetime") if date_el and date_el.has_attr("datetime") else (date_el.get_text(strip=True) if date_el else "")
        excerpt_el = p.select_one(".entry-summary, .entry-content")
        excerpt = excerpt_el.get_text(" ", strip=True)[:300] if excerpt_el else ""
        out.append({"id": make_id(source,title,link), "source": source, "title": title, "link": link, "date_posted": date, "excerpt": excerpt})
    return out

# --------- indbeasiswa.com ---------
def scrape_indbeasiswa(limit=30):
    source = "indbeasiswa.com"
    base = "https://indbeasiswa.com"
    html = safe_get(base)
    if not html: return []
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article, .post") or soup.select(".loop-post")
    out = []
    for p in posts[:limit]:
        a = p.select_one("h2.entry-title a, .entry-title a, h2 a")
        if not a: continue
        title = a.get_text(strip=True)
        link = urljoin(base, a.get("href"))
        # fetch detail for excerpt/date
        excerpt = ""
        date = ""
        if allowed(link):
            time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
            sub = safe_get(link)
            if sub:
                s2 = BeautifulSoup(sub, "html.parser")
                date_el = s2.select_one("time")
                date = date_el.get("datetime") if date_el and date_el.has_attr("datetime") else (date_el.get_text(strip=True) if date_el else "")
                cont = s2.select_one(".entry-content, .post-content, .single-content")
                excerpt = cont.get_text(" ", strip=True)[:400] if cont else ""
        out.append({"id": make_id(source,title,link), "source": source, "title": title, "link": link, "date_posted": date, "excerpt": excerpt})
    return out

# --------- luarkampus.id (category) ---------
def scrape_luarkampus(limit=30):
    source = "luarkampus.id"
    start = "https://luarkampus.id/category/beasiswa/"
    html = safe_get(start)
    if not html: return []
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article, .jeg_post, .jeg_meta") 
    out = []
    for p in posts[:limit]:
        a = p.select_one("h3.jeg_post_title a, h2.entry-title a, a.jeg_post_title, .jeg_post_title a")
        if not a: continue
        title = a.get_text(strip=True)
        link = urljoin(start, a.get("href"))
        excerpt_el = p.select_one(".jeg_post_excerpt, .entry-content")
        excerpt = excerpt_el.get_text(" ", strip=True)[:300] if excerpt_el else ""
        out.append({"id": make_id(source,title,link), "source": source, "title": title, "link": link, "date_posted": "", "excerpt": excerpt})
    return out

# --------- daftarbeasiswa.com (example) ---------
def scrape_daftarbeasiswa(limit=30):
    source = "daftarbeasiswa.com"
    base = "https://www.daftarbeasiswa.com"
    html = safe_get(base)
    if not html: return []
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article, .post")
    out = []
    for p in posts[:limit]:
        a = p.select_one("h2.entry-title a, a")
        if not a: continue
        title = a.get_text(strip=True)
        link = urljoin(base, a.get("href"))
        excerpt_el = p.select_one(".entry-summary, .entry-content")
        excerpt = excerpt_el.get_text(" ", strip=True)[:300] if excerpt_el else ""
        out.append({"id": make_id(source,title,link), "source": source, "title": title, "link": link, "date_posted": "", "excerpt": excerpt})
    return out

# --------- merge & dedupe ---------
def dedupe(items):
    seen = set()
    out = []
    for it in items:
        if it["id"] in seen:
            continue
        seen.add(it["id"])
        out.append(it)
    return out

def scrape_all():
    items = []
    try:
        items += scrape_beasiswa_id(50)
    except Exception:
        pass
    time.sleep(1)
    try:
        items += scrape_indbeasiswa(50)
    except Exception:
        pass
    time.sleep(1)
    try:
        items += scrape_luarkampus(50)
    except Exception:
        pass
    time.sleep(1)
    try:
        items += scrape_daftarbeasiswa(50)
    except Exception:
        pass

    merged = dedupe(items)
    # sort by date_posted if exists else keep order
    def keyfn(x):
        return x.get("date_posted") or ""
    merged = sorted(merged, key=keyfn, reverse=True)
    # save
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
    return merged