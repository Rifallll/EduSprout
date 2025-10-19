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

def safe_request(url):
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        res.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
        return res.text
    except requests.exceptions.RequestException as e:
        logging.warning(f"Error fetching {url}: {e}")
    return None

def parse_detail_page(html_content, link_url, source_name):
    """Parses common detail page elements like full content, organizer, location, and deadline."""
    soup = BeautifulSoup(html_content, "html.parser")
    
    full_content = ""
    content_el = soup.select_one(".entry-content, .post-content, .content, .single-content")
    if content_el:
        full_content = content_el.get_text(separator="\n", strip=True)
    
    excerpt = full_content[:300] if full_content else "" # Use first 300 chars as excerpt

    organizer = ""
    organizer_match = re.search(r"(?:Penyelenggara|Organized by|Oleh):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if organizer_match:
        organizer = organizer_match.group(1).strip()
    elif source_name == "indbeasiswa.com": # Default for indbeasiswa if not found in content
        organizer = "Indbeasiswa.com"

    deadline = "Tidak diketahui"
    # 1. Try to find explicit deadline phrases
    deadline_match = re.search(r"(?:Deadline|Batas waktu pendaftaran|Pendaftaran hingga|sampai dengan):\s*(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}/\d{1,2}/\d{4})", full_content, re.IGNORECASE)
    if deadline_match:
        date_str = deadline_match.group(1).strip()
        for fmt in ["%d %B %Y", "%Y-%m-%d", "%d/%m/%Y"]:
            try:
                parsed_date = datetime.strptime(date_str, fmt)
                deadline = parsed_date.strftime("%d %B %Y") # Standardize to "DD Month YYYY"
                break
            except ValueError:
                continue
    
    # 2. Fallback: try to get date from time tag (if not already found)
    if deadline == "Tidak diketahui":
        time_el = soup.select_one("time[datetime]")
        if time_el and time_el.has_attr("datetime"):
            try:
                parsed_date = datetime.strptime(time_el["datetime"], "%Y-%m-%d")
                deadline = parsed_date.strftime("%d %B %Y")
            except ValueError:
                pass

    # 3. Fallback: search for any date-like pattern in the content
    if deadline == "Tidak diketahui":
        date_patterns = [
            r'\b(\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4})\b',
            r'\b(\d{4}-\d{2}-\d{2})\b',
            r'\b(\d{1,2}/\d{1,2}/\d{4})\b'
        ]
        for pattern in date_patterns:
            match = re.search(pattern, full_content, re.IGNORECASE)
            if match:
                date_str = match.group(1).strip()
                for fmt in ["%d %B %Y", "%Y-%m-%d", "%d/%m/%Y"]:
                    try:
                        parsed_date = datetime.strptime(date_str, fmt)
                        deadline = parsed_date.strftime("%d %B %Y")
                        break
                    except ValueError:
                        continue
                if deadline != "Tidak diketahui":
                    break

    location = "Tidak diketahui"
    # 1. Try to find explicit location phrases
    location_match = re.search(r"(?:Lokasi|Tempat|Negara|Kota|Wilayah):\s*(.*?)(?:\n|$)", full_content, re.IGNORECASE)
    if location_match:
        location = location_match.group(1).strip()
    
    # 2. Fallback: check for common keywords in full content
    if location == "Tidak diketahui":
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
        "description": excerpt,
        "organizer": organizer,
        "date": deadline, # Renamed to 'date' to match RawScholarshipItem
        "location": location
    }

# ==========================
# 1. beasiswa.id
# ==========================
def scrape_beasiswa_id(max_items=20):
    source = "beasiswa.id"
    base = "https://beasiswa.id"
    start_url = base + "/category/beasiswa/"
    out = []

    logging.info(f"[{source}] Scraping {start_url} ...")
    if not allowed(start_url):
        logging.warning(f"[{source}] blocked by robots.txt — skipping.")
        return out

    html = safe_request(start_url)
    if not html:
        return out
    
    soup = BeautifulSoup(html, "html.parser")
    # More robust selection: find article containers first
    article_containers = soup.select("article.jeg_post") 
    
    if not article_containers:
        logging.warning(f"[{source}] No article containers found with selector 'article.jeg_post' on {start_url}")
        return out

    for i, container in enumerate(article_containers[:max_items]):
        a_tag = container.select_one("h3.jeg_post_title a") # Then find the title link inside
        if not a_tag:
            logging.debug(f"[{source}] Skipping container {i} due to missing title link.")
            continue

        title = a_tag.get_text(strip=True)
        link = urljoin(base, a_tag.get("href"))

        if title.upper() == "DAFTAR SEKARANG" or "kirimwa.id" in link.lower() or "whatsapp" in link.lower():
            logging.debug(f"[{source}] Skipping promotional post: {title} - {link}")
            continue

        logging.info(f"[{source}] Processing: {title}")
        detail_html = safe_request(link)
        if not detail_html:
            continue
        
        detail_data = parse_detail_page(detail_html, link, source)
        
        category = "Internasional" if "luar negeri" in title.lower() or "international" in detail_data["fullContent"].lower() else "Lokal"

        out.append({
            "id": make_id(source, title, link),
            "source": source,
            "title": title,
            "description": detail_data["description"],
            "category": category,
            "date": detail_data["date"],
            "location": detail_data["location"],
            "link": link,
            "fullContent": detail_data["fullContent"],
            "organizer": detail_data["organizer"],
        })
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    logging.info(f"✅ {len(out)} data from {source}")
    return out

# ==========================
# 2. indbeasiswa.com
# ==========================
def scrape_indbeasiswa(max_items=20):
    source = "indbeasiswa.com"
    base = "https://indbeasiswa.com"
    start_url = base + "/beasiswa-s1/"
    out = []

    logging.info(f"[{source}] Scraping {start_url} ...")
    # Temporarily bypass robots.txt for testing purposes
    # if not allowed(start_url):
    #     logging.warning(f"[{source}] blocked by robots.txt — skipping.")
    #     return out

    html = safe_request(start_url)
    if not html:
        return out
    
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select(".post-title a")
    
    if not posts:
        logging.warning(f"[{source}] No posts found with selector '.post-title a' on {start_url}")
        return out

    for i, a_tag in enumerate(posts[:max_items]):
        title = a_tag.get_text(strip=True)
        link = urljoin(base, a_tag.get("href"))

        logging.info(f"[{source}] Processing: {title}")
        detail_html = safe_request(link)
        if not detail_html:
            continue
        
        detail_data = parse_detail_page(detail_html, link, source)
        
        category = "Internasional" if "luar negeri" in title.lower() or "international" in detail_data["fullContent"].lower() else "Lokal"

        out.append({
            "id": make_id(source, title, link),
            "source": source,
            "title": title,
            "description": detail_data["description"],
            "category": category,
            "date": detail_data["date"],
            "location": detail_data["location"],
            "link": link,
            "fullContent": detail_data["fullContent"],
            "organizer": detail_data["organizer"],
        })
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    logging.info(f"✅ {len(out)} data from {source}")
    return out

# ==========================
# 3. luarkampus.id
# ==========================
def scrape_luarkampus(max_items=20):
    source = "luarkampus.id"
    base = "https://luarkampus.id"
    start_url = base # Changed to base URL
    out = []

    logging.info(f"[{source}] Scraping {start_url} ...")
    if not allowed(start_url):
        logging.warning(f"[{source}] blocked by robots.txt — skipping.")
        return out

    html = safe_request(start_url)
    if not html:
        return out
    
    soup = BeautifulSoup(html, "html.parser")
    # Selector for posts on the main page
    posts = soup.select(".elementor-post__title a") 
    
    if not posts:
        logging.warning(f"[{source}] No posts found with selector '.elementor-post__title a' on {start_url}")
        return out

    for i, a_tag in enumerate(posts[:max_items]):
        title = a_tag.get_text(strip=True)
        link = urljoin(base, a_tag.get("href"))

        logging.info(f"[{source}] Processing: {title}")
        detail_html = safe_request(link)
        if not detail_html:
            continue
        
        detail_data = parse_detail_page(detail_html, link, source)
        
        category = "Internasional" if "luar negeri" in title.lower() or "international" in detail_data["fullContent"].lower() else "Lokal"

        out.append({
            "id": make_id(source, title, link),
            "source": source,
            "title": title,
            "description": detail_data["description"],
            "category": category,
            "date": detail_data["date"],
            "location": detail_data["location"],
            "link": link,
            "fullContent": detail_data["fullContent"],
            "organizer": detail_data["organizer"],
        })
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    logging.info(f"✅ {len(out)} data from {source}")
    return out

# ==========================
# 4. scholarship4u.com
# ==========================
def scrape_scholarship4u(max_items=20):
    source = "scholarship4u.com"
    base = "https://www.scholarship4u.com/"
    start_url = base + "category/scholarships/"
    out = []

    logging.info(f"[{source}] Scraping {start_url} ...")
    if not allowed(start_url):
        logging.warning(f"[{source}] blocked by robots.txt — skipping.")
        return out

    html = safe_request(start_url)
    if not html:
        return out
    
    soup = BeautifulSoup(html, "html.parser")
    posts = soup.select("article, .post")
    
    if not posts:
        logging.warning(f"[{source}] No posts found with selector 'article, .post' on {start_url}")
        return out

    for i, p in enumerate(posts[:max_items]):
        title_el = p.select_one("h2.entry-title a, .post-title a")
        if not title_el:
            logging.debug(f"[{source}] Skipping post {i} due to missing title link.")
            continue
        
        title = title_el.get_text(strip=True)
        link = urljoin(base, title_el.get("href"))

        logging.info(f"[{source}] Processing: {title}")
        detail_html = safe_request(link)
        if not detail_html:
            continue
        
        detail_data = parse_detail_page(detail_html, link, source)
        
        category = "Internasional" if "luar negeri" in title.lower() or "international" in detail_data["fullContent"].lower() else "Lokal"

        out.append({
            "id": make_id(source, title, link),
            "source": source,
            "title": title,
            "description": detail_data["description"],
            "category": category,
            "date": detail_data["date"],
            "location": detail_data["location"],
            "link": link,
            "fullContent": detail_data["fullContent"],
            "organizer": detail_data["organizer"],
        })
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    logging.info(f"✅ {len(out)} data from {source}")
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
    all_data = []
    all_data += scrape_beasiswa_id(max_items=20)
    time.sleep(1)
    all_data += scrape_indbeasiswa(max_items=20)
    time.sleep(1)
    all_data += scrape_luarkampus(max_items=20)
    time.sleep(1)
    all_data += scrape_scholarship4u(max_items=20)

    merged = dedupe(all_data)
    merged_sorted = sorted(merged, key=lambda x: parse_date_for_sort(x.get("date")), reverse=True)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(merged_sorted, f, ensure_ascii=False, indent=2)
    print(f"\n🎉 Semua selesai! Total {len(merged_sorted)} data disimpan di {OUTPUT}")

if __name__ == "__main__":
    main()