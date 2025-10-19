import requests
from bs4 import BeautifulSoup
import json
import time
import random
from urllib.parse import urljoin
import logging
from datetime import datetime
import re # Import regex

# --------- CONFIG ---------
BASE = "https://beasiswa.id"
LIST_URL = "https://beasiswa.id/category/beasiswa/"
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
    items = soup.select("article.jeg_post, div.jeg_post_wrapper, div.jeg_postblock_content, .post, .listing, article")
    results = []
    for it in items:
        a = it.select_one("h2 a, h3 a, .entry-title a, .post-title a")
        if not a:
            a = it.select_one("a")
            if not a: continue

        title = a.get_text(strip=True)
        link = urljoin(BASE, a.get("href"))
        
        excerpt_el = it.select_one(".entry-summary p, .post-excerpt p, .description")
        excerpt = excerpt_el.get_text(strip=True)[:200] if excerpt_el else ""

        results.append({"title": title, "link": link, "excerpt": excerpt})
    return results

def parse_detail(html):
    soup = BeautifulSoup(html, "html.parser")
    content_el = soup.select_one(".entry-content, .post-content, .content")
    full_content = content_el.get_text(separator="\n", strip=True) if content_el else ""
    
    organizer = None
    # Try to find "Penyelenggara:" or "Organized by:" in content
    organizer_match = re.search(r"(?:Penyelenggara|Organized by):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if organizer_match:
        organizer = organizer_match.group(1).strip()

    deadline_date = "Tidak diketahui"
    # Look for "Deadline:" or "Batas waktu pendaftaran:" in content
    deadline_match = re.search(r"(?:Deadline|Batas waktu pendaftaran|Pendaftaran hingga|sampai dengan):\s*(\d{1,2}\s+\w+\s+\d{4})", full_content, re.IGNORECASE)
    if deadline_match:
        deadline_date = deadline_match.group(1).strip()
    else:
        # Fallback to date from time tag or general text if no specific deadline found
        time_el = soup.select_one("time[datetime]")
        if time_el and time_el.has_attr("datetime"):
            deadline_date = time_el["datetime"]
        else:
            date_text_el = soup.select_one(".post-date, .published-date, .entry-date, .meta-date")
            if date_text_el:
                date_text = date_text_el.get_text(strip=True)
                for fmt in ["%d %B %Y", "%Y-%m-%d", "%b %d, %Y"]:
                    try:
                        parsed_date = datetime.strptime(date_text, fmt)
                        deadline_date = parsed_date.strftime("%d %B %Y") # Format consistently
                        break
                    except ValueError:
                        continue
    
    location = "Tidak diketahui"
    # Look for "Lokasi:", "Tempat:", "Negara:", "Kota:" in content
    location_match = re.search(r"(?:Lokasi|Tempat|Negara|Kota):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if location_match:
        location = location_match.group(1).strip()
    elif "online" in full_content.lower():
        location = "Online"
    elif "dalam negeri" in full_content.lower():
        location = "Indonesia"
    elif "luar negeri" in full_content.lower() or "international" in full_content.lower():
        location = "Internasional"

    return {"fullContent": full_content, "organizer": organizer, "date": deadline_date, "location": location}

def main():
    logging.info("Starting scholarship scraping from Beasiswa.id")
    try:
        html = fetch(LIST_URL)
        listings = parse_list(html)
        logging.info(f"Found {len(listings)} items in the listing page.")
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch listing page: {e}")
        return

    out = []
    for i, item in enumerate(listings, 1):
        logging.info(f"[{i}/{len(listings)}] Processing: {item['title']}")
        try:
            time.sleep(random.uniform(0.8, 1.8))
            detail = parse_detail(fetch(item["link"]))
            
            category = "Internasional" if "luar negeri" in item["title"].lower() or "international" in detail["fullContent"].lower() else "Lokal"

            out.append({
                "id": f"beasiswa_id_{i}",
                "title": item["title"],
                "description": item["excerpt"],
                "category": category,
                "date": detail["date"],
                "location": detail["location"],
                "link": item["link"],
                "fullContent": detail["fullContent"],
                "organizer": detail["organizer"]
            })
        except requests.exceptions.RequestException as e:
            logging.warning(f"Error fetching detail page for {item['link']}: {e}")
        except Exception as e:
            logging.error(f"Unexpected error during detail page parsing for {item['link']}: {e}")
    
    output_file = "src/data/scrapedScholarships.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    logging.info(f"✅ Saved {len(out)} scholarships to {output_file}")

if __name__ == "__main__":
    main()