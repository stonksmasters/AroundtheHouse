#[compute]
#version 450

layout(local_size_x = 16, local_size_y = 16, local_size_z = 1) in; // Workgroup size: 16x16 threads

// Input buffer: Pre-generated noise values from the TileMapLayer (e.g., Perlin noise)
layout(set = 0, binding = 0, std430) buffer NoiseInputBuffer {
	float noise_input[];  // Noise input from TileMapLayer
};

// Output buffer: Processed heightmap data
layout(set = 0, binding = 1, std430) buffer HeightOutputBuffer {
	float height_output[];  // Heightmap output buffer
};

// Parameters (if needed for tweaking noise scale)
uniform float height_multiplier = 10.0;  // Multiplies noise values to create height variation

void main() {
	// Calculate the global thread index
	uint x = gl_GlobalInvocationID.x;
	uint y = gl_GlobalInvocationID.y;
	uint index = y * 16 + x;  // Flatten 2D coordinates into 1D index

	// Retrieve the noise value from the input buffer (already generated)
	float noise_value = noise_input[index];

	// Process the noise into a height value (e.g., scaling for height variation)
	float height_value = noise_value * height_multiplier;

	// Store the processed height value in the height output buffer
	height_output[index] = height_value;
}
