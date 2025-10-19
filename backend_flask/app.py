# app.py
from flask import Flask, render_template, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
import scraper, os, atexit

app = Flask(__name__, template_folder="templates")
DATA_FILE = "data/beasiswa.json"

# ensure data folder
os.makedirs("data", exist_ok=True)

# initial scrape if file missing
if not os.path.exists(DATA_FILE):
    print("Initial scraping...")
    scraper.scrape_all()

@app.route("/api/beasiswa")
def api_beasiswa():
    if os.path.exists(DATA_FILE):
        import json
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return jsonify(json.load(f))
    return jsonify([])

@app.route("/")
def index():
    return render_template("index.html")

# Scheduler: run every 6 hours (you can change)
scheduler = BackgroundScheduler()
scheduler.add_job(lambda: scraper.scrape_all(), 'interval', hours=6, id='scrape_job', replace_existing=True)
scheduler.start()

# shut down scheduler on exit
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
    app.run(debug=True)