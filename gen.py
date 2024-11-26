import json
import os
from jinja2 import Environment, FileSystemLoader

# Load the locations data
with open('locations.json', 'r') as json_file:
    locations = json.load(json_file)

# Set up the Jinja2 environment
env = Environment(loader=FileSystemLoader('public'), autoescape=True)

# Load the HTML template
template = env.get_template('template.html')

# Generate individual pages for each location
for location_key, location_data in locations.items():
    output_dir = f'public/{location_key}'
    output_file = os.path.join(output_dir, 'index.html')
    
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Render the template with actual data
    filled_template = template.render(
        location=location_data['location'],
        location_slug=location_key,
        latitude=location_data['latitude'],
        longitude=location_data['longitude']
    )
    
    # Write the filled template to a new file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(filled_template)
    
print("HTML pages generated successfully.")
