const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve the client.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

app.listen(port, () => {
    console.log(`Web client running on http://localhost:${port}`);
});
