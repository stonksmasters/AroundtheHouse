const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the correct public directory
app.use(express.static(path.join(__dirname, '../public')));

// Mock IP endpoint for testing
app.get('/ipinfo', (req, res) => {
    res.json({
        city: 'Zachary',
        region: 'LA',
        country: 'US',
    });
});

// Catch-all to serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Mock IP server running at http://localhost:${port}`);
});
