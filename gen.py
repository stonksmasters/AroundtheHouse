import json
import os

# Load the locations data
with open('locations.json') as json_file:
    locations = json.load(json_file)

# Read the HTML template
with open('public/index.html', 'r') as file:
    template = file.read()

# Generate individual pages for each location
for location_key, location_data in locations.items():
    output_dir = f'public/{location_key}'
    output_file = os.path.join(output_dir, 'index.html')
    
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Replace the placeholders with actual data
    filled_template = template.replace('[[ location ]]', location_data['location'])
    filled_template = filled_template.replace('[[ latitude ]]', location_data['latitude'])
    filled_template = filled_template.replace('[[ longitude ]]', location_data['longitude'])
    
    # Write the filled template to a new file
    with open(output_file, 'w') as file:
        file.write(filled_template)

print("HTML pages generated successfully.")
