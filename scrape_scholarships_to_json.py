import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import urllib.robotparser
import time, random, json, hashlib, logging
from datetime import datetime
import feedparser
from dateutil import parser as dateparser

# -------- CONFIG ----------
HEADERS = {"User-Agent": "Mozilla/5.0 (EduScraper/1.0; +https://example.com)"}
DELAY_MIN, DELAY_MAX = 0.8, 1.6
OUTPUT_RAW = "data/beasiswa_all.json"
LOG_FILE = "logs/scraper.log"
MAX_PER_SITE = 25  # safety limit per site, increased to get more data
# List of scrapers to run (functions defined below)
# You can add/remove functions from this list
# ---------------------------

logging.basicConfig(level=logging.INFO, filename=LOG_FILE,
                    format="%(asctime)s %(levelname)s: %(message)s")

def allowed_by_robots(url):
    try:
        p = urlparse(url)
        robots_url = f"{p.scheme}://{p.netloc}/robots.txt"
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(HEADERS["User-Agent"], url)
    except Exception as e:
        logging.warning(f"robots.txt check failed for {url}: {e}")
        return True  # be permissive if robots can't be read

def safe_get(url, timeout=15, allow_redirects=True):
    """GET with headers and simple retry/backoff"""
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=allow_redirects)
            if r.status_code == 200:
                return r.text
            else:
                logging.warning(f"GET {url} returned status {r.status_code}")
                time.sleep(1 + attempt)
        except Exception as e:
            logging.warning(f"GET {url} exception: {e}")
            time.sleep(1 + attempt)
    return ""

def make_id(source, title, link):
    s = f"{source}|{title}|{link}"
    return hashlib.sha1(s.encode("utf-8")).hexdigest()

def parse_date_safe(text):
    if not text:
        return ""
    try:
        dt = dateparser.parse(text, fuzzy=True)
        return dt.date().isoformat()
    except Exception:
        return text.strip()

def parse_detail_page_generic(html_content, link_url, source_name):
    """Parses common detail page elements like full content, organizer, location, and deadline."""
    soup = BeautifulSoup(html_content, "html.parser")
    
    full_content = ""
    content_el = soup.select_one(".entry-content, .post-content, .content, .single-content, div[itemprop='articleBody']")
    if content_el:
        full_content = content_el.get_text(separator="\n", strip=True)
    
    excerpt = full_content[:600] if full_content else ""

    organizer = ""
    organizer_match = re.search(r"(?:Penyelenggara|Organized by|Oleh):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if organizer_match:
        organizer = organizer_match.group(1).strip()

    deadline = "Tidak diketahui"
    deadline_match = re.search(r"(?:Deadline|Batas waktu pendaftaran|Pendaftaran hingga|sampai dengan):\s*(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}/\d{1,2}/\d{4})", full_content, re.IGNORECASE)
    if deadline_match:
        deadline = parse_date_safe(deadline_match.group(1).strip())
    else:
        time_el = soup.select_one("time[datetime]")
        if time_el and time_el.has_attr("datetime"):
            deadline = parse_date_safe(time_el["datetime"])
        elif time_el:
            deadline = parse_date_safe(time_el.get_text(strip=True))

    location = "Tidak diketahui"
    location_match = re.search(r"(?:Lokasi|Tempat|Negara|Kota|Wilayah):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if location_match:
        location = location_match.group(1).strip()
    else:
        lower_content = full_content.lower()
        if "online" in lower_content or "daring" in lower_content or "virtual" in lower_content:
            location = "Online"
        elif "remote" in lower_content or "dari rumah" in lower_content:
            location = "Remote"
        elif "indonesia" in lower_content or "dalam negeri" in lower_content:
            location = "Indonesia"
        elif "luar negeri" in lower_content or "internasional" in lower_content:
            location = "Internasional"
        else:
            cities = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Makassar", "Semarang", "Denpasar"]
            for city in cities:
                if city.lower() in lower_content:
                    location = city
                    break

    return {
        "fullContent": full_content,
        "excerpt": excerpt,
        "organizer": organizer,
        "date_posted": deadline, # Use date_posted for consistency
        "location": location
    }


# -------------------------
# SCRAPER: beasiswa.id
# -------------------------
def scrape_beasiswa_id(limit=MAX_PER_SITE):
    source = "beasiswa.id"
    base = "https://beasiswa.id/"
    items = []
    if not allowed_by_robots(base):
        logging.info(f"{source} blocked in robots.txt")
        return items
    html = safe_get(base)
    if not html:
        return items
    soup = BeautifulSoup(html, "html.parser")
    # More robust selector for beasiswa.id
    posts = soup.select("article.jeg_post, div.jeg_post_wrapper") 
    
    for p in posts[:limit]:
        try:
            a = p.select_one("h3.jeg_post_title a, h2.entry-title a, h2 a, a")
            if not a:
                continue
            title = a.get_text(strip=True)
            link = urljoin(base, a.get("href"))
            
            if title.upper() == "DAFTAR SEKARANG" or "kirimwa.id" in link.lower() or "whatsapp" in link.lower():
                logging.debug(f"[{source}] Skipping promotional post: {title} - {link}")
                continue

            # Fetch detail page for robust fields
            full_data = {}
            if allowed_by_robots(link):
                time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                det_html = safe_get(link)
                if det_html:
                    full_data = parse_detail_page_generic(det_html, link, source)
            
            items.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "link": link,
                "date_posted": full_data.get("date_posted", ""),
                "excerpt": full_data.get("excerpt", ""),
                "fullContent": full_data.get("fullContent", ""),
                "organizer": full_data.get("organizer", ""),
                "location": full_data.get("location", "")
            })
        except Exception as e:
            logging.exception(f"{source} parse item error: {e}")
    logging.info(f"{source} scraped {len(items)} items")
    return items

# -------------------------
# SCRAPER: indbeasiswa.com
# -------------------------
def scrape_indbeasiswa(limit=MAX_PER_SITE):
    source = "indbeasiswa.com"
    base = "https://indbeasiswa.com/"
    items = []
    if not allowed_by_robots(base):
        logging.info(f"{source} blocked in robots.txt")
        return items
    html = safe_get(base)
    if not html:
        return items
    soup = BeautifulSoup(html, "html.parser")
    # More robust selector for indbeasiswa.com
    posts = soup.select("article.post-item, article.jeg_post")
    
    for p in posts[:limit]:
        try:
            a = p.select_one("h2.post-title a, h3.jeg_post_title a, .entry-title a, h2 a, a")
            if not a:
                continue
            title = a.get_text(strip=True)
            link = urljoin(base, a.get("href"))
            
            # Fetch detail page for robust fields
            full_data = {}
            if allowed_by_robots(link):
                time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                det_html = safe_get(link)
                if det_html:
                    full_data = parse_detail_page_generic(det_html, link, source)
            
            items.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "link": link,
                "date_posted": full_data.get("date_posted", ""),
                "excerpt": full_data.get("excerpt", ""),
                "fullContent": full_data.get("fullContent", ""),
                "organizer": full_data.get("organizer", ""),
                "location": full_data.get("location", "")
            })
        except Exception as e:
            logging.exception(f"{source} parse item error: {e}")
    logging.info(f"{source} scraped {len(items)} items")
    return items

# -------------------------
# SCRAPER: luarkampus.id (category beasiswa)
# -------------------------
def scrape_luarkampus(limit=MAX_PER_SITE):
    source = "luarkampus.id"
    start = "https://luarkampus.id/beasiswa/" # Corrected URL
    items = []
    if not allowed_by_robots(start):
        logging.info(f"{source} blocked in robots.txt")
        return items
    html = safe_get(start)
    if not html:
        return items
    soup = BeautifulSoup(html, "html.parser")
    # More robust selector for luarkampus.id
    posts = soup.select("div.elementor-posts-container article.elementor-post")
    
    for p in posts[:limit]:
        try:
            a = p.select_one("h3.elementor-post__title a, h2.entry-title a, h2 a, a")
            if not a:
                continue
            title = a.get_text(strip=True)
            link = urljoin(start, a.get("href"))
            
            # Fetch detail page for robust fields
            full_data = {}
            if allowed_by_robots(link):
                time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                det_html = safe_get(link)
                if det_html:
                    full_data = parse_detail_page_generic(det_html, link, source)
            
            items.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "link": link,
                "date_posted": full_data.get("date_posted", ""),
                "excerpt": full_data.get("excerpt", ""),
                "fullContent": full_data.get("fullContent", ""),
                "organizer": full_data.get("organizer", ""),
                "location": full_data.get("location", "")
            })
        except Exception as e:
            logging.exception(f"{source} parse item error: {e}")
    logging.info(f"{source} scraped {len(items)} items")
    return items

# -------------------------
# SCRAPER: schoters (schoters.com) - aggregator indonesia
# -------------------------
def scrape_schoters(limit=MAX_PER_SITE):
    source = "schoters.com"
    start = "https://www.schoters.com/id/beasiswa/"
    items = []
    if not allowed_by_robots(start):
        logging.info(f"{source} blocked in robots.txt")
        return items
    html = safe_get(start)
    if not html:
        return items
    soup = BeautifulSoup(html, "html.parser")
    # More robust selector for schoters.com
    cards = soup.select(".jeg_post_wrapper, .post-item, article.post, .card")
    
    for p in cards[:limit]:
        try:
            a = p.select_one("h2 a, h3 a, .title a, a")
            if not a or not a.get("href"):
                continue
            title = a.get_text(" ", strip=True)[:240] or a.get("title","").strip()
            link = urljoin(start, a.get("href"))
            
            # Fetch detail page for robust fields
            full_data = {}
            if allowed_by_robots(link):
                time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                det_html = safe_get(link)
                if det_html:
                    full_data = parse_detail_page_generic(det_html, link, source)
            
            items.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "link": link,
                "date_posted": full_data.get("date_posted", ""),
                "excerpt": full_data.get("excerpt", ""),
                "fullContent": full_data.get("fullContent", ""),
                "organizer": full_data.get("organizer", ""),
                "location": full_data.get("location", "")
            })
        except Exception as e:
            logging.exception(f"{source} parse item error: {e}")
    logging.info(f"{source} scraped {len(items)} items")
    return items

# -------------------------
# SCRAPER: scholarshipportal (international aggregator) - uses search RSS where possible
# -------------------------
def scrape_scholarshipportal(limit=MAX_PER_SITE):
    source = "scholarshipportal.com"
    base = "https://www.scholarshipportal.com/"
    items = []
    
    # Try RSS feed first
    feed_url = "https://www.scholarshipportal.com/rss"
    try:
        f = feedparser.parse(feed_url)
        if f and f.entries:
            for e in f.entries[:limit]:
                title = e.get("title", "")[:240]
                link = e.get("link", "")
                date = parse_date_safe(e.get("published", e.get("updated", "")))
                
                # Attempt to fetch detail page for RSS items too
                full_data = {}
                if allowed_by_robots(link):
                    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                    det_html = safe_get(link)
                    if det_html:
                        full_data = parse_detail_page_generic(det_html, link, source)

                items.append({
                    "id": make_id(source, title, link),
                    "source": source,
                    "title": title,
                    "link": link,
                    "date_posted": full_data.get("date_posted", date), # Prefer detail page date, fallback to RSS date
                    "excerpt": full_data.get("excerpt", e.get("summary","")[:400]),
                    "fullContent": full_data.get("fullContent", ""),
                    "organizer": full_data.get("organizer", ""),
                    "location": full_data.get("location", "")
                })
            logging.info(f"{source} scraped {len(items)} items via RSS")
            return items
    except Exception as e:
        logging.warning(f"{source} feed error: {e}")

    # Fallback: do basic GET and try some selectors (best-effort)
    html = safe_get(base)
    if not html:
        return items
    soup = BeautifulSoup(html, "html.parser")
    # More robust selector for scholarshipportal.com
    posts = soup.select(".search-result-item, .card, article, .item")
    
    for p in posts[:limit]:
        try:
            a = p.select_one("h2 a, h3 a, .title a, a")
            if not a or not a.get("href"):
                continue
            title = a.get_text(" ", strip=True)[:240]
            link = urljoin(base, a.get("href"))
            
            # Fetch detail page for robust fields
            full_data = {}
            if allowed_by_robots(link):
                time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                det_html = safe_get(link)
                if det_html:
                    full_data = parse_detail_page_generic(det_html, link, source)

            items.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "link": link,
                "date_posted": full_data.get("date_posted", ""),
                "excerpt": full_data.get("excerpt", ""),
                "fullContent": full_data.get("fullContent", ""),
                "organizer": full_data.get("organizer", ""),
                "location": full_data.get("location", "")
            })
        except Exception as e:
            logging.exception(f"{source} fallback error: {e}")
    logging.info(f"{source} scraped {len(items)} items (fallback)")
    return items

# -------------------------
# Merge, dedupe, save
# -------------------------
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
    all_items = []
    try:
        all_items.extend(scrape_beasiswa_id())
    except Exception:
        logging.exception("Error scraping beasiswa.id")
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    try:
        all_items.extend(scrape_indbeasiswa())
    except Exception:
        logging.exception("Error scraping indbeasiswa")
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    try:
        all_items.extend(scrape_luarkampus())
    except Exception:
        logging.exception("Error scraping luarkampus")
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    try:
        all_items.extend(scrape_schoters())
    except Exception:
        logging.exception("Error scraping schoters")
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    try:
        all_items.extend(scrape_scholarshipportal())
    except Exception:
        logging.exception("Error scraping scholarshipportal")
    # add other scrapers similarly...

    merged = dedupe(all_items)
    # best-effort sort by date_posted (descending), else keep as scraped
    def sort_key(x):
        return x.get("date_posted") or ""
    merged_sorted = sorted(merged, key=sort_key, reverse=True)
    # ensure data folder exists
    import os
    os.makedirs("data", exist_ok=True)
    with open(OUTPUT_RAW, "w", encoding="utf-8") as f:
        json.dump(merged_sorted, f, ensure_ascii=False, indent=2)
    logging.info(f"Saved total {len(merged_sorted)} items to {OUTPUT_RAW}")
    return merged_sorted

if __name__ == "__main__":
    start = datetime.utcnow().isoformat()
    logging.info("Scraper started")
    items = scrape_all()
    logging.info(f"Scraper finished, {len(items)} items")
    print(f"Done. {len(items)} items saved to {OUTPUT_RAW}")