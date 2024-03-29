// app.js
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const uri = "mongodb+srv://testuser:testuser@cluster0.gaufq.mongodb.net/ItineraryPlanner?retryWrites=true&w=majority";
// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))

const viewRoutes = require('./routes/viewRoutes');
const databaseRoutes = require('./routes/databaseRoutes');
const testRoutes = require('./routes/testRouter');

app.use('/test', testRoutes);
app.use('/', viewRoutes);
app.use('/api', databaseRoutes);


const port = 3000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
