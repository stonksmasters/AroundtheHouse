import os
import json

# Load the locations data from the JSON file
with open('locations.json', 'r') as f:
    locations = json.load(f)

# Read the template content
with open('public/index.html', 'r') as template_file:
    template_content = template_file.read()

# Create a folder and an index.html file for each location
for location_key, location_data in locations.items():
    # Create a directory for each location
    location_dir = f'public/{location_key}'
    os.makedirs(location_dir, exist_ok=True)

    # Replace placeholders with actual data
    output_content = template_content
    output_content = output_content.replace("{{location}}", location_data["location"])
    output_content = output_content.replace("{{latitude}}", location_data["latitude"])
    output_content = output_content.replace("{{longitude}}", location_data["longitude"])
    output_content = output_content.replace("{{keywords}}", location_data["keywords"])
    output_content = output_content.replace("{{description}}", location_data["description"])

    # Write the modified content to index.html in the location's directory
    with open(f'{location_dir}/index.html', 'w') as output_file:
        output_file.write(output_content)

print("Location pages generated successfully!")
