import sqlite3
import json
from datetime import datetime

DB_PATH = "jobs.db"
OUTPUT_PATH = "src/data/jobs_from_db.json" # Changed output path to an intermediate file

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# NOTE: For 'company' and 'location' to be populated, your 'jobs.db' schema
# must be updated to include these columns (e.g., ALTER TABLE jobs ADD COLUMN company TEXT;
# ALTER TABLE jobs ADD COLUMN location TEXT;).
# Additionally, your fetching script (e.g., fetch_jobstreet_rss.py) must
# be updated to extract and store this information into the database.
cur.execute("SELECT id, source, title, company, location, link, published, fetched_at FROM jobs ORDER BY id DESC")
rows = cur.fetchall()
conn.close()

jobs = []
for row in rows:
    # Ensure the number of items in 'row' matches the SELECT query
    # If company/location are not in your DB yet, they will be None or cause an error.
    # Adjust this unpacking if your DB schema is different.
    job_id, source, title, company, location, link, published, fetched_at = row
    jobs.append({
        "id": job_id,
        "source": source,
        "title": title,
        "company": company if company else "",  # Use company from DB, default to empty string
        "location": location if location else "", # Use location from DB, default to empty string
        "link": link,
        "date_posted": published or fetched_at
    })

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(jobs, f, ensure_ascii=False, indent=2)

print(f"✅ {len(jobs)} jobs exported to {OUTPUT_PATH} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")