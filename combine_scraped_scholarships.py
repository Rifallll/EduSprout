import json
import os
from datetime import datetime

INPUT_FILE = "beasiswa_all.json"
OUTPUT_FILE = "src/data/scrapedScholarships.json"

def combine_and_export_scholarships():
    all_scholarships = []
    if os.path.exists(INPUT_FILE):
        with open(INPUT_FILE, "r", encoding="utf-8") as f:
            all_scholarships = json.load(f)
        print(f"Read {len(all_scholarships)} scholarships from {INPUT_FILE}")
    else:
        print(f"Warning: {INPUT_FILE} not found. No scholarships to combine.")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_scholarships, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {len(all_scholarships)} scholarships exported to {OUTPUT_FILE} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    combine_and_export_scholarships()