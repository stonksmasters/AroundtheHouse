from flask import Flask, render_template, redirect
import json

app = Flask(__name__, template_folder='public', static_folder='static')

# Load location data from JSON
with open('locations.json') as f:
    locations = json.load(f)

@app.route('/')
def home():
    return redirect('/baton-rouge/')  # Default to Baton Rouge if no location is specified

@app.route('/<location>/')
def location_page(location):
    location_data = locations.get(location)
    if location_data:
        return render_template('template.html',
                               location=location_data['location'],
                               location_slug=location,
                               latitude=location_data['latitude'],
                               longitude=location_data['longitude'])
    else:
        return redirect('/baton-rouge/')  # Redirect to Baton Rouge if location is not found

if __name__ == "__main__":
    app.run(debug=True)
