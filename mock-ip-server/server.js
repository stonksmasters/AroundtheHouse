const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log(`Received request for: ${req.url}`);
    next();
});

// Serve static files from the correct public directory
app.use(express.static(path.join(__dirname, '../public')));

// Mock IP endpoint for testing
app.get('/ipinfo', (req, res) => {
    console.log("Mock IP endpoint hit, returning Zachary IP info.");
    res.json({
        city: 'Zachary',
        region: 'LA',
        country: 'US',
    });
});

// Catch-all to serve index.html for any unknown routes
app.get('*', (req, res) => {
    console.log(`Catch-all route hit, serving index.html for ${req.url}`);
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Mock IP server running at http://localhost:${port}`);
});
