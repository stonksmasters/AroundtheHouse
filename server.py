from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/ipinfo', methods=['GET'])
def ipinfo():
    return jsonify({
        "city": "Zachary",
        "region": "LA",
        "country": "US"
    })

if __name__ == "__main__":
    app.run(port=5000)  # Running on port 5000
