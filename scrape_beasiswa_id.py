import requests
from bs4 import BeautifulSoup
import json
import time
import random
from urllib.parse import urljoin
import logging
from datetime import datetime # Import datetime

# --------- CONFIG ---------
BASE = "https://beasiswa.id"
LIST_URL = "https://beasiswa.id/category/beasiswa/"  # contoh halaman kategori
HEADERS = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36"} # Updated User-Agent

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s - %(funcName)s')

def fetch(url):
    logging.info(f"Fetching URL: {url}")
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.text

def parse_list(html):
    soup = BeautifulSoup(html, "html.parser")
    # More robust selectors for post items on beasiswa.id category page
    # Added 'article.jeg_post', 'div.jeg_post_wrapper', 'div.jeg_postblock_content' as common patterns
    items = soup.select("article.jeg_post, div.jeg_post_wrapper, div.jeg_postblock_content, .post, .listing, article")
    results = []
    for it in items:
        a = it.select_one("h2 a, h3 a, .entry-title a, .post-title a") # More specific selectors for title link
        if not a: 
            a = it.select_one("a") # Fallback to any link
            if not a: continue

        title = a.get_text(strip=True)
        link = urljoin(BASE, a.get("href"))
        
        # Try to get a more relevant excerpt
        excerpt_el = it.select_one(".entry-summary p, .post-excerpt p, .description")
        excerpt = excerpt_el.get_text(strip=True)[:200] if excerpt_el else ""

        results.append({"title": title, "link": link, "excerpt": excerpt})
    return results

def parse_detail(html):
    soup = BeautifulSoup(html, "html.parser")
    content_el = soup.select_one(".entry-content, .post-content, .content")
    content = content_el.get_text(separator="\n", strip=True) if content_el else ""
    
    organizer = None
    # Try to find organizer in meta or specific elements
    organizer_el = soup.select_one(".meta-organizer, .post-author, .organizer-name")
    if organizer_el:
        organizer = organizer_el.get_text(strip=True)
    else:
        meta = soup.select_one(".meta, .post-meta")
        if meta:
            organizer = meta.get_text(strip=True) # Fallback to general meta text

    date_posted = None
    # Try to get date from time tag with datetime attribute
    time_el = soup.select_one("time[datetime]")
    if time_el and time_el.has_attr("datetime"):
        date_posted = time_el["datetime"]
    else:
        # Fallback: try to get date from text content of common date elements
        date_text_el = soup.select_one(".post-date, .published-date, .entry-date, .meta-date")
        if date_text_el:
            date_text = date_text_el.get_text(strip=True)
            # Attempt to parse common date formats (e.g., "10 November 2024", "2024-11-10")
            for fmt in ["%d %B %Y", "%Y-%m-%d", "%b %d, %Y"]: # Add more formats if needed
                try:
                    parsed_date = datetime.strptime(date_text, fmt)
                    date_posted = parsed_date.strftime("%Y-%m-%d")
                    break
                except ValueError:
                    continue
    
    if not date_posted:
        # Final fallback: use today's date
        date_posted = datetime.now().strftime("%Y-%m-%d")

    return {"content": content, "organizer": organizer, "date_posted": date_posted}

def main():
    logging.info("Starting scholarship scraping from Beasiswa.id")
    try:
        html = fetch(LIST_URL)
        listings = parse_list(html)
        logging.info(f"Found {len(listings)} items in the listing page.") # Added this line for debugging
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch listing page: {e}")
        return

    out = []
    for i, item in enumerate(listings, 1):
        logging.info(f"[{i}/{len(listings)}] Processing: {item['title']}")
        try:
            time.sleep(random.uniform(0.8, 1.8)) # Add random delay
            detail_html = fetch(item["link"])
            detail = parse_detail(detail_html)
            
            # Combine data, ensuring 'date' is present
            out.append({
                "id": f"beasiswa_id_{i}", # Generate a simple ID
                "title": item["title"],
                "description": item["excerpt"], # Using excerpt as description
                "category": "Internasional" if "luar negeri" in item["title"].lower() else "Lokal", # Simple category logic
                "date": detail["date_posted"] or "Tidak diketahui", # Use date from detail or default
                "location": "Online" if "online" in detail["content"].lower() else "Tidak diketahui", # Simple location logic
                "link": item["link"],
                "fullContent": detail["content"],
                "organizer": detail["organizer"]
            })
        except requests.exceptions.RequestException as e:
            logging.warning(f"Error fetching detail page for {item['link']}: {e}")
        except Exception as e:
            logging.error(f"Unexpected error during detail page parsing for {item['link']}: {e}")
    
    output_file = "src/data/scrapedScholarships.json" # Changed output path
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    logging.info(f"✅ Saved {len(out)} scholarships to {output_file}")

if __name__ == "__main__":
    main()