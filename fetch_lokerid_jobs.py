import requests
from bs4 import BeautifulSoup
import sqlite3
import hashlib
import time
import random
from urllib.parse import urljoin

# --------- CONFIG ---------
BASE_URL = "https://www.loker.id"
LISTING_URL = "https://www.loker.id/cari-lowongan-kerja"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36"
}
DELAY = 1.0  # jeda antar request (detik)
DB_PATH = "jobs_lokerid.db"

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

def make_hash(title, company, location):
    s = (title or "") + "|" + (company or "") + "|" + (location or "")
    # sederhana: lowercase + hanya alnum & space
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
    except sqlite3.IntegrityError:
        # sudah ada → skip atau bisa update jika diperlukan
        pass
    conn.close()

# --------- Scrape daftar lowongan ---------
def scrape_listings(max_items=50):
    resp = requests.get(LISTING_URL, headers=HEADERS, timeout=15)
    if resp.status_code != 200:
        print("Gagal ambil daftar: status", resp.status_code)
        return

    soup = BeautifulSoup(resp.text, "html.parser")
    # contoh selector: tiap lowongan mungkin dalam elemen <article> atau <div class="job-card"> dll
    # kita lihat struktur contoh dari inspect browser
    # di Loker.id bisa saja:
    posts = soup.select("div.card, article")  # coba dua kemungkinan
    count = 0
    for p in posts:
        # cari link & judul
        a = p.select_one("a")
        if not a:
            continue
        link = a.get("href")
        # make absolute URL
        full_link = urljoin(BASE_URL, link)
        title = a.get_text(strip=True)
        # ambil info tambahan kalau ada
        company = None
        location = None
        date_posted = None

        # Fetch detail halaman untuk info lebih lanjut
        try:
            time.sleep(random.uniform(DELAY, DELAY + 1.0))
            r2 = requests.get(full_link, headers=HEADERS, timeout=15)
            if r2.status_code == 200:
                s2 = BeautifulSoup(r2.text, "html.parser")
                # contoh selector: perusahaan bisa di elemen <div class="company"> atau <span class="employer">, ini harus dicek via Inspect
                comp_el = s2.select_one(".company, .employer")
                if comp_el:
                    company = comp_el.get_text(strip=True)
                loc_el = s2.select_one(".location")
                if loc_el:
                    location = loc_el.get_text(strip=True)
                time_el = s2.select_one("time")
                if time_el and time_el.has_attr("datetime"):
                    date_posted = time_el["datetime"]
        except Exception as e:
            print("Error fetch detail:", e)

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

    print(f"Disimpan {count} lowongan dari Loker.id")

if __name__ == "__main__":
    init_db()
    scrape_listings(max_items=100)