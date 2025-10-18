import requests
from bs4 import BeautifulSoup
import sqlite3
import hashlib
import time
import random
from urllib.parse import urljoin
import logging

# --------- CONFIG ---------
BASE_URL = "https://www.loker.id"
LISTING_URL = "https://www.loker.id/cari-lowongan-kerja"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36"
}
DELAY = 1.0  # jeda antar request (detik)
DB_PATH = "jobs_lokerid.db"

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s - %(funcName)s')

# --------- Inisialisasi DB ---------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        canonical_hash TEXT UNIQUE,
        title TEXT,
        company TEXT,
        location TEXT,
        link TEXT,
        date_posted TEXT,
        fetched_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()
    logging.info("Database initialized.")

def make_hash(title, company, location):
    s = (title or "") + "|" + (company or "") + "|" + (location or "")
    s = "".join(ch for ch in s.lower() if ch.isalnum() or ch.isspace())
    return hashlib.sha256(s.encode("utf-8")).hexdigest()

def upsert_job(job):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute('''
            INSERT INTO jobs (canonical_hash, title, company, location, link, date_posted)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            job["canonical_hash"], job["title"], job.get("company"),
            job.get("location"), job["link"], job.get("date_posted")
        ))
        conn.commit()
        logging.debug(f"Upserted job: {job['title']}")
    except sqlite3.IntegrityError:
        logging.debug(f"Job already exists, skipping: {job['title']}")
    except Exception as e:
        logging.error(f"Error upserting job {job.get('title', 'N/A')}: {e}")
    finally:
        conn.close()

# --------- Scrape daftar lowongan ---------
def scrape_listings(max_items=50):
    logging.info(f"Starting to scrape listings from {LISTING_URL}")
    try:
        resp = requests.get(LISTING_URL, headers=HEADERS, timeout=15)
        resp.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch listing page: {e}")
        return

    soup = BeautifulSoup(resp.text, "html.parser")
    
    # More specific selectors for job posts.
    # These selectors are based on common patterns and might need adjustment
    # if the Loker.id structure changes significantly.
    posts = soup.select("div.job-list-item, article.job-card, div[data-qa='job-card'], .job-item") 
    if not posts:
        logging.warning("No specific job listing elements found. Falling back to generic 'div.card, article'.")
        posts = soup.select("div.card, article") # Fallback to generic if specific fails

    count = 0
    for p in posts:
        link = None
        title = None
        
        # Try to find the main job title link first using more specific selectors
        title_el = p.select_one("h2 a, h3 a, .job-title a, .card-title a") 
        if title_el:
            link = title_el.get("href")
            title = title_el.get_text(strip=True)
        else:
            # Fallback to any generic link if a specific title link isn't found
            a = p.select_one("a")
            if a:
                link = a.get("href")
                title = a.get_text(strip=True)

        if not link or not title:
            logging.debug("Skipping post due to missing link or title.")
            continue

        full_link = urljoin(BASE_URL, link)
        
        company = None
        location = None
        date_posted = None

        # Fetch detail halaman untuk info lebih lanjut
        try:
            time.sleep(random.uniform(DELAY, DELAY + 1.0))
            r2 = requests.get(full_link, headers=HEADERS, timeout=15)
            r2.raise_for_status()
            s2 = BeautifulSoup(r2.text, "html.parser")
            
            # Extract company using more specific selectors
            comp_el = s2.select_one(".company, .employer, [data-qa='job-company-name'], .job-detail-company-name") 
            if comp_el:
                company = comp_el.get_text(strip=True)
            
            # Extract location using more specific selectors
            loc_el = s2.select_one(".location, [data-qa='job-location'], .job-detail-location") 
            if loc_el:
                location = loc_el.get_text(strip=True)
            
            # Extract date posted using more specific selectors and datetime attribute
            time_el = s2.select_one("time[datetime], .job-posted-date, .job-date") 
            if time_el and time_el.has_attr("datetime"):
                date_posted = time_el["datetime"]
            elif time_el: # If no datetime attribute, try to parse text
                date_posted = time_el.get_text(strip=True)

        except requests.exceptions.RequestException as e:
            logging.warning(f"Error fetching detail page for {full_link}: {e}")
        except Exception as e:
            logging.error(f"Unexpected error during detail page parsing for {full_link}: {e}")

        job = {
            "title": title,
            "company": company,
            "location": location,
            "link": full_link,
            "date_posted": date_posted,
        }
        job["canonical_hash"] = make_hash(job["title"], job["company"], job["location"])
        upsert_job(job)

        count += 1
        if count >= max_items:
            break

    logging.info(f"Scraped and saved {count} jobs from Loker.id")

if __name__ == "__main__":
    init_db()
    scrape_listings(max_items=100)