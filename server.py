from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/ipinfo')
def ipinfo():
    return jsonify({
        "city": "Zachary",
        "region": "LA",
        "country": "US"
    })

if __name__ == "__main__":
    app.run(debug=True)
