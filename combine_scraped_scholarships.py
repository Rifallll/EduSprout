import json, os, re
from datetime import datetime
from dateutil import parser as dateparser # Import dateparser

RAW = "data/beasiswa_all.json"
OUT = "src/data/scrapedScholarships.json"

def normalize_item(it):
    # Normalize keys and ensure required fields
    title = it.get("title","").strip()
    link = it.get("link","").strip()
    source = it.get("source","").strip()
    date_posted = it.get("date_posted","") or ""
    # normalize date YYYY-MM-DD if possible
    try:
        if date_posted and date_posted != "Tidak diketahui":
            date_posted = dateparser.parse(date_posted, fuzzy=True).date().isoformat()
        else:
            date_posted = "" # Ensure it's an empty string if "Tidak diketahui"
    except Exception:
        date_posted = "" # Fallback to empty string on parsing error
    
    excerpt = it.get("excerpt","") or ""
    full = it.get("fullContent","") or ""
    organizer = it.get("organizer","") or ""
    location = it.get("location","") or ""
    
    # extract level keywords (S1,S2,undergraduate,master)
    level = []
    txt = (title + " " + excerpt + " " + full).lower()
    if re.search(r"\b(smp|mts|kelas 7|kelas 8|kelas 9)\b", txt): level.append("SMP")
    if re.search(r"\b(sma|smk|sederajat|kelas 10|kelas 11|kelas 12)\b", txt): level.append("SMA")
    if re.search(r"\b(d2|diploma 2)\b", txt): level.append("D2")
    if re.search(r"\b(d3|diploma 3)\b", txt): level.append("D3")
    if re.search(r"\b(d4|diploma 4)\b", txt): level.append("D4")
    if re.search(r"\b(s1|sarjana|undergraduate|bachelor)\b", txt): level.append("S1")
    if re.search(r"\b(s2|master|postgraduate|magister)\b", txt): level.append("S2")
    if re.search(r"\b(s3|phd|doctor|doktor)\b", txt): level.append("S3")
    if re.search(r"\b(non-degree|kursus|pelatihan singkat)\b", txt): level.append("Non-Degree")
    if re.search(r"\b(gap year)\b", txt): level.append("Gap Year")
    if re.search(r"\b(profesi|guru|dokter|akuntan)\b", txt): level.append("Profesi")
    
    if not level:
        level = ["All"] # Default if no specific level found

    # type detection
    types = []
    if re.search(r"fully funded|fully-funded|full[- ]?scholarship|dibiayai penuh|beasiswa penuh|100%", txt): types.append("Fully Funded")
    if re.search(r"partially funded|sebagian|potongan biaya|bantuan dana", txt): types.append("Partially Funded")
    if re.search(r"mentoring|pembinaan|bimbingan", txt): types.append("Mentoring")
    if re.search(r"riset|penelitian", txt): types.append("Riset")
    if re.search(r"exchange|pertukaran pelajar", txt): types.append("Exchange")
    if re.search(r"pelatihan|studi singkat|kursus|program singkat", txt): types.append("Pelatihan/Studi Singkat")
    if re.search(r"self funded|dana mandiri", txt): types.append("Self Funded")
    if re.search(r"pendanaan proyek|dana proyek", txt): types.append("Pendanaan Project")
    if re.search(r"magang|internship", txt): types.append("Internship")

    if not types:
        types = ["Other"] # Default if no specific type found

    return {
        "id": it.get("id") or make_id(source, title, link), # Use make_id if id is missing
        "title": title,
        "source": source,
        "link": link,
        "date_posted": date_posted,
        "excerpt": excerpt,
        "fullContent": full,
        "organizer": organizer,
        "location": location,
        "degreeLevels": list(set(level)), # Ensure unique levels
        "fundingTypes": list(set(types)), # Ensure unique types
        "scraped_at": datetime.utcnow().isoformat()
    }

def main():
    if not os.path.exists(RAW):
        print(f"No raw file found at {RAW}. Run scraper first.")
        return
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(RAW, "r", encoding="utf-8") as f:
        raw = json.load(f)
    normalized = [normalize_item(it) for it in raw]
    
    # Sort by date_posted descending, placing items with valid dates first
    def keyfn(x):
        date_str = x.get("date_posted")
        if date_str:
            try:
                return datetime.fromisoformat(date_str)
            except ValueError:
                pass
        return datetime.min # Treat invalid/missing dates as very old for sorting
        
    normalized_sorted = sorted(normalized, key=keyfn, reverse=True)
    
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(normalized_sorted, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(normalized_sorted)} normalized items to {OUT}")

if __name__ == "__main__":
    main()