import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time, random, json, hashlib, urllib.robotparser
from datetime import datetime
import re
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s - %(funcName)s')

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; EduScraper/1.0; +https://example.com)"}
DELAY_MIN = 0.8
DELAY_MAX = 1.6
OUTPUT = "beasiswa_all.json"

def allowed(url):
    try:
        parsed = urlparse(url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(HEADERS["User-Agent"], url)
    except Exception as e:
        logging.warning(f"Error checking robots.txt for {url}: {e}. Assuming allowed.")
        return True

def make_id(source, title, link):
    s = f"{source}|{title}|{link}"
    return hashlib.sha1(s.encode("utf-8")).hexdigest()

# -------- scraper for beasiswa.id --------
def scrape_beasiswa_id(max_items=50):
    source = "beasiswa.id"
    base = "https://beasiswa.id"
    start = base + "/"
    out = []

    logging.info(f"[{source}] Starting to scrape from {start}")

    try:
        if not allowed(start):
            logging.warning(f"[{source}] blocked by robots.txt — skip")
            return out

        r = requests.get(start, headers=HEADERS, timeout=15)
        r.raise_for_status()
        s = BeautifulSoup(r.text, "html.parser")

        # More specific selectors for actual scholarship posts on beasiswa.id
        # Targeting articles within the main content block
        posts = s.select("div.jeg_postblock_content article.jeg_post")
        if not posts:
            logging.warning(f"[{source}] No specific 'div.jeg_postblock_content article.jeg_post' elements found. Trying broader 'article.jeg_post'.")
            posts = s.select("article.jeg_post") # Fallback to broader article if specific fails
        if not posts:
            logging.warning(f"[{source}] No 'article.jeg_post' elements found. Trying even broader 'article'.")
            posts = s.select("article") # Even broader fallback

        for i, p in enumerate(posts[:max_items]):
            # Try to find the main job title link first using more specific selectors
            title_el = p.select_one("h3.jeg_post_title a, h2.entry-title a, .entry-title a, .post-title a") 
            if not title_el:
                title_el = p.select_one("a") # Fallback to any link if specific title link isn't found
            
            if not title_el:
                logging.debug(f"[{source}] Skipping post {i} due to missing title link.")
                continue

            title = title_el.get_text(strip=True)
            link = urljoin(base, title_el.get("href"))

            # Filter out generic titles like "DAFTAR SEKARANG" or links to non-scholarship content
            if title.upper() == "DAFTAR SEKARANG" or "kirimwa.id" in link.lower():
                logging.debug(f"[{source}] Skipping promotional post: {title} - {link}")
                continue
            
            # Initialize detail fields
            excerpt = ""
            full_content = ""
            organizer = ""
            location = ""
            deadline = "Tidak diketahui" # Initialize deadline here

            try:
                if allowed(link):
                    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                    r_detail = requests.get(link, headers=HEADERS, timeout=15)
                    r_detail.raise_for_status()
                    s_detail = BeautifulSoup(r_detail.text, "html.parser")
                    
                    content_el = s_detail.select_one(".entry-content, .post-content, .content")
                    full_content = content_el.get_text(separator="\n", strip=True) if content_el else ""
                    excerpt = full_content[:300] if full_content else "" # Use first 300 chars as excerpt

                    # Extract organizer
                    organizer_match = re.search(r"(?:Penyelenggara|Organized by):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
                    if organizer_match:
                        organizer = organizer_match.group(1).strip()

                    # Extract deadline
                    deadline_match = re.search(r"(?:Deadline|Batas waktu pendaftaran|Pendaftaran hingga|sampai dengan):\s*(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}/\d{1,2}/\d{4})", full_content, re.IGNORECASE)
                    if deadline_match:
                        date_str = deadline_match.group(1).strip()
                        for fmt in ["%d %B %Y", "%Y-%m-%d", "%d/%m/%Y"]:
                            try:
                                parsed_date = datetime.strptime(date_str, fmt)
                                deadline = parsed_date.strftime("%d %B %Y")
                                break
                            except ValueError:
                                continue
                    
                    # Fallback for deadline from time tag if not found in content
                    if deadline == "Tidak diketahui": # Only try fallback if still unknown
                        time_el = s_detail.select_one("time[datetime]")
                        if time_el and time_el.has_attr("datetime"):
                            try:
                                parsed_date = datetime.strptime(time_el["datetime"], "%Y-%m-%d")
                                deadline = parsed_date.strftime("%d %B %Y")
                            except ValueError:
                                pass

                    # Extract location
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

            except requests.exceptions.RequestException as e:
                logging.warning(f"[{source}] Error fetching detail page for {link}: {e}")
            except Exception as e:
                logging.error(f"[{source}] Unexpected error during detail page parsing for {link}: {e}")
            
            category = "Internasional" if "luar negeri" in title.lower() or "international" in full_content.lower() else "Lokal"

            out.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "description": excerpt,
                "category": category,
                "date": deadline, # Use 'date' for deadline
                "location": location,
                "link": link,
                "fullContent": full_content,
                "organizer": organizer,
            })
    except requests.exceptions.RequestException as e:
        logging.error(f"[{source}] Failed to fetch listing page: {e}")
    logging.info(f"[{source}] found {len(out)} items")
    return out

# -------- scraper for indbeasiswa.com --------
def scrape_indbeasiswa(max_items=50):
    source = "indbeasiswa.com"
    base = "https://indbeasiswa.com"
    start = base + "/category/beasiswa/"
    out = []

    logging.info(f"[{source}] Starting to scrape from {start}")

    try:
        if not allowed(start):
            logging.warning(f"[{source}] blocked by robots.txt — skip")
            return out

        r = requests.get(start, headers=HEADERS, timeout=15)
        r.raise_for_status()
        s = BeautifulSoup(r.text, "html.parser")

        posts = s.select("article, .post, .loop-post, div.jeg_post, article.post-item, div.entry-card")
        if not posts:
            logging.warning(f"[{source}] No specific job listing elements found. Falling back to generic 'div.card, article'.")
            posts = s.select("div.card, article") # Fallback to generic if specific fails

        for i, p in enumerate(posts[:max_items]):
            a = p.select_one("h2.entry-title a, .jeg_post_title a, .entry-title a, h2 a")
            if not a:
                logging.debug(f"[{source}] Skipping post {i} due to missing title link.")
                continue
            title = a.get_text(strip=True)
            link = urljoin(base, a.get("href"))
            
            # fetch detail for excerpt, date, full content, organizer, location
            excerpt = ""
            full_content = ""
            organizer = ""
            location = ""
            deadline = "Tidak diketahui" # Initialize deadline here

            try:
                if allowed(link):
                    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
                    r_detail = requests.get(link, headers=HEADERS, timeout=15)
                    r_detail.raise_for_status()
                    s_detail = BeautifulSoup(r_detail.text, "html.parser")
                    
                    content_el = s_detail.select_one(".entry-content, .post-content, .single-content")
                    full_content = content_el.get_text(separator="\n", strip=True) if content_el else ""
                    excerpt = full_content[:400] if full_content else "" # Use first 400 chars as excerpt

                    # Extract organizer
                    organizer_match = re.search(r"(?:Penyelenggara|Organized by):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
                    if organizer_match:
                        organizer = organizer_match.group(1).strip()
                    else:
                        organizer = "Indbeasiswa.com" # Default if not found

                    # Extract deadline
                    deadline_match = re.search(r"(?:Deadline|Batas waktu pendaftaran|Pendaftaran hingga|sampai dengan):\s*(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}/\d{1,2}/\d{4})", full_content, re.IGNORECASE)
                    if deadline_match:
                        date_str = deadline_match.group(1).strip()
                        for fmt in ["%d %B %Y", "%Y-%m-%d", "%d/%m/%Y"]:
                            try:
                                parsed_date = datetime.strptime(date_str, fmt)
                                deadline = parsed_date.strftime("%d %B %Y")
                                break
                            except ValueError:
                                continue
                    
                    # Fallback for deadline from time tag if not found in content
                    if deadline == "Tidak diketahui": # Only try fallback if still unknown
                        time_el = s_detail.select_one("time[datetime]")
                        if time_el and time_el.has_attr("datetime"):
                            try:
                                parsed_date = datetime.strptime(time_el["datetime"], "%Y-%m-%d")
                                deadline = parsed_date.strftime("%d %B %Y")
                            except ValueError:
                                pass

                    # Extract location
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

            except requests.exceptions.RequestException as e:
                logging.warning(f"[{source}] Error fetching detail page for {link}: {e}")
            except Exception as e:
                logging.error(f"[{source}] Unexpected error during detail page parsing for {link}: {e}")

            category = "Internasional" if "luar negeri" in title.lower() or "international" in full_content.lower() else "Lokal"

            out.append({
                "id": make_id(source, title, link),
                "source": source,
                "title": title,
                "description": excerpt,
                "category": category,
                "date": deadline, # Use 'date' for deadline
                "location": location,
                "link": link,
                "fullContent": full_content,
                "organizer": organizer,
            })
    except requests.exceptions.RequestException as e:
        logging.error(f"[{source}] Failed to fetch listing page: {e}")
    logging.info(f"[{source}] found {len(out)} items")
    return out

def dedupe(items):
    seen = set()
    out = []
    for it in items:
        if it["id"] in seen:
            continue
        seen.add(it["id"])
        out.append(it)
    return out

def parse_date_for_sort(date_string):
    if not date_string or date_string == "Tidak diketahui":
        return datetime.min # Treat unknown dates as very old

    # Try parsing "DD Month YYYY"
    month_map = {
        "januari": 1, "februari": 2, "maret": 3, "april": 4, "mei": 5, "juni": 6,
        "juli": 7, "agustus": 8, "september": 9, "oktober": 10, "november": 11, "desember": 12
    }
    match = re.match(r'(\d{1,2})\s*(\w+)\s*(\d{4})', date_string, re.IGNORECASE)
    if match:
        day, month_name, year = match.groups()
        month_num = month_map.get(month_name.lower())
        if month_num:
            return datetime(int(year), month_num, int(day))
    
    # Try parsing "YYYY-MM-DD"
    try:
        return datetime.strptime(date_string, "%Y-%m-%d")
    except ValueError:
        pass

    # Try parsing "DD/MM/YYYY"
    try:
        return datetime.strptime(date_string, "%d/%m/%Y")
    except ValueError:
        pass

    return datetime.min # Fallback for unparseable dates

def main():
    all_items = []
    all_items += scrape_beasiswa_id(max_items=100)
    time.sleep(1.0)
    # all_items += scrape_indbeasiswa(max_items=100) # Commented out due to robots.txt

    merged = dedupe(all_items)
    
    merged_sorted = sorted(merged, key=lambda x: parse_date_for_sort(x.get("date")), reverse=True)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(merged_sorted, f, ensure_ascii=False, indent=2)
    logging.info(f"Saved {len(merged_sorted)} items to {OUTPUT}")

if __name__ == "__main__":
    main()