// app.js

const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a simple route
app.get('/', (req, res) => {
    // Render the 'index.ejs' view
    res.render('index', { title: 'Express EJS Project', user: { username: "John Doe" } });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
