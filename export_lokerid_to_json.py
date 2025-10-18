import sqlite3
import json
from datetime import datetime

DB_PATH = "jobs_lokerid.db"
OUTPUT_PATH = "src/data/jobs_from_lokerid.json"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

cur.execute("SELECT id, title, company, location, link, date_posted, fetched_at FROM jobs ORDER BY id DESC")
rows = cur.fetchall()
conn.close()

jobs = []
for row in rows:
    job_id, title, company, location, link, date_posted, fetched_at = row
    jobs.append({
        "id": f"job_lokerid_{job_id}", # Prefix ID to ensure uniqueness across sources
        "source": "lokerid",
        "title": title,
        "company": company if company else "",
        "location": location if location else "",
        "link": link,
        "date_posted": date_posted or fetched_at
    })

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(jobs, f, ensure_ascii=False, indent=2)

print(f"✅ {len(jobs)} jobs exported from Loker.id to {OUTPUT_PATH} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")