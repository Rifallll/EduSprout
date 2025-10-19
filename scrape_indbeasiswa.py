import requests
from bs4 import BeautifulSoup
import json, time, random
from urllib.parse import urljoin
import logging
from datetime import datetime # Import datetime

# --------- CONFIG ---------
BASE = "https://indbeasiswa.com"
LIST_URL = "https://indbeasiswa.com/category/beasiswa/"
HEADERS = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36"}

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s - %(funcName)s')

def fetch(url):
    logging.info(f"Fetching URL: {url}")
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.text

def parse_list(html):
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article, .post, .loop-post")
    results = []
    for p in posts:
        a = p.select_one("h2 a, .entry-title a")
        if not a: continue
        title = a.get_text(strip=True)
        link = urljoin(BASE, a["href"])

        excerpt_el = p.select_one(".entry-summary p, .post-excerpt p, .description")
        excerpt = excerpt_el.get_text(strip=True)[:200] if excerpt_el else ""

        results.append({"title": title, "link": link, "excerpt": excerpt})
    return results

def parse_detail(html):
    soup = BeautifulSoup(html, "html.parser")
    content = ""
    el = soup.select_one(".entry-content, .single-content, .post-content")
    if el:
        content = el.get_text(separator="\n", strip=True)
    
    date = None
    date_el = soup.select_one("time[datetime]")
    if date_el and date_el.has_attr("datetime"):
        date = date_el["datetime"]
    else:
        date_text_el = soup.select_one(".entry-date, .post-date, .published-date, .meta-date")
        if date_text_el:
            date_text = date_text_el.get_text(strip=True)
            for fmt in ["%d %B %Y", "%Y-%m-%d", "%b %d, %Y"]:
                try:
                    parsed_date = datetime.strptime(date_text, fmt)
                    date = parsed_date.strftime("%Y-%m-%d")
                    break
                except ValueError:
                    continue
    
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")

    return {"content": content, "date": date}

def main():
    logging.info("Starting scholarship scraping from Indbeasiswa.com")
    try:
        html = fetch(LIST_URL)
        items = parse_list(html)
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch listing page: {e}")
        return

    out = []
    for i, it in enumerate(items[:50], 1):
        logging.info(f"[{i}/{len(items[:50])}] Processing: {it['title']}")
        try:
            time.sleep(random.uniform(0.8,1.6))
            h = fetch(it["link"])
            d = parse_detail(h)

            # Infer category and location
            category = "Internasional" if "luar negeri" in it["title"].lower() or "international" in d["content"].lower() else "Lokal"
            location = "Online" if "online" in d["content"].lower() else "Tidak diketahui"

            out.append({
                "id": f"indbeasiswa_{i}",
                "title": it["title"],
                "description": it["excerpt"] or d["content"][:200],
                "category": category,
                "date": d["date"] or "Tidak diketahui",
                "location": location,
                "link": it["link"],
                "fullContent": d["content"],
            })
        except requests.exceptions.RequestException as e:
            logging.warning(f"Error fetching detail page for {it['link']}: {e}")
        except Exception as e:
            logging.error(f"Unexpected error during detail page parsing for {it['link']}: {e}")

    output_file = "src/data/scrapedIndbeasiswa.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    logging.info(f"✅ Saved {len(out)} scholarships to {output_file}")

if __name__ == "__main__":
    main()