const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

// Initialize Express App
const app = express();

app.use(cors()); // enable CORS
app.use(bodyParser.json()); // parses application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// MySQL Connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});

// API route to handle booking form submission
app.post('/api/contact', (req, res) => {
    const { full_name, email, phone, preferred_date, message } = req.body;

    db.query(
        'INSERT INTO booking_submissions (full_name, email, phone, preferred_date, message) VALUES (?,?,?,?,?)',
        [full_name, email, phone, preferred_date, message],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error:'Database Error'})
            } else {
                res.json({success:'Booking submission received'})
            }
        }
    )
});

// API route to handle contact form submission (if you have another form)
app.post('/api/contact-form', (req, res) => {
    const { full_name, email, phone, message } = req.body;

    db.query(
        'INSERT INTO contact_submissions (full_name, email, phone, message) VALUES (?,?,?,?)',
        [full_name, email, phone, message],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error:'Database Error'})
            } else {
                res.json({success:'Contact submission received'})
            }
        }
    )
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
