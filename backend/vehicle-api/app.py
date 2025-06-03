from flask import Flask, jsonify
from flask_cors import CORS
import random
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

LOG_FILE = 'vehicle_data_log.json'

def log_data(data):
    # Önce dosyada var olan veriyi oku
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'r', encoding='utf-8') as f:
            try:
                logs = json.load(f)
            except json.JSONDecodeError:
                logs = []
    else:
        logs = []

    # Yeni veriyi zaman damgasıyla ekle
    logs.append({
        "timestamp": datetime.utcnow().isoformat() + 'Z',
        "data": data
    })

    # Dosyaya tekrar yaz
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(logs, f, indent=2)

@app.route('/api/vehicle-data', methods=['GET'])
def get_vehicle_data():
    data = {
        "speed": round(random.uniform(40, 120), 2),
        "engine_temp": round(random.uniform(70, 110), 2),
        "fuel_level": round(random.uniform(10, 100), 2),
        "location": {
            "lat": round(random.uniform(36.8, 37.0), 6),
            "lon": round(random.uniform(34.5, 34.7), 6)
        }
    }

    # Veriyi dosyaya kaydet
    log_data(data)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
