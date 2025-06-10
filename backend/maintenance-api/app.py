from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/maintenance-data")
def maintenance_data():
    vehicles = []
    for i in range(5):
        speed = random.randint(60, 140)
        engine_temp = random.randint(60, 120)
        fuel_level = random.randint(10, 100)
        maintenance_required = engine_temp > 100 or fuel_level < 15

        vehicles.append({
            "vehicle_id": f"BUS-{i+1}",
            "speed": speed,
            "engine_temp": engine_temp,
            "fuel_level": fuel_level,
            "maintenance_required": maintenance_required
        })

    return jsonify(vehicles)

if __name__ == "__main__":
    app.run(port=5003)
