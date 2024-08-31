from flask import Flask, render_template
import requests

app = Flask(__name__)

# Replace this with your actual function to get location data from ipinfo.io
def get_location_from_ip(ip_address):
    access_token = '044b0523070f3b'  # Replace with your actual IPInfo access token
    url = f"https://ipinfo.io/{ip_address}?token={access_token}"
    response = requests.get(url)
    data = response.json()
    
    location_data = {
        "city": data.get("city", "Unknown Location"),
        "latitude": data.get("loc", "0,0").split(",")[0],
        "longitude": data.get("loc", "0,0").split(",")[1]
    }
    
    return location_data

# Test endpoint to simulate different locations
@app.route('/test_location/<ip_address>')
def test_location(ip_address):
    location_data = get_location_from_ip(ip_address)
    
    return render_template(
        'index.html',
        location=location_data["city"],
        latitude=location_data["latitude"],
        longitude=location_data["longitude"]
    )

if __name__ == '__main__':
    app.run(debug=True)
