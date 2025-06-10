from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/factory-data")
def factory_data():
    return jsonify({
        "line": "HAT-1",
        "shift": "06:00 - 14:00",
        "operator": "Ali Kaya",
        "productionCount": random.randint(100, 200),
        "status": "active" if random.random() > 0.1 else "fault"
    })

if __name__ == "__main__":
    app.run(port=5004)
