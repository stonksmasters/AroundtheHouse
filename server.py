from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_url_path='/static', static_folder='public/static')

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('public', path)

@app.route('/static/<path:filename>')
def serve_static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Mock IP endpoint for testing different locations
@app.route('/ipinfo')
def mock_ipinfo():
    return jsonify({
        "city": "Zachary",  # Mocked IP location
        "region": "LA",
        "country": "US"
    })

if __name__ == '__main__':
    app.run(port=3000, debug=True)
