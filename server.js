const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            age INTEGER,
            dob DATE
        )`, (createErr) => {
            if (createErr) {
                console.error('Error creating table:', createErr);
            } else {
                console.log('Database and table created successfully.');
            }
        });
    }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to retrieve and display data in a tabular format
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to fetch data from the database');
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to handle form submissions and store data in the database
app.post('/submit', (req, res) => {
    const { name, email, age, dob } = req.body;

    db.run(`INSERT INTO users (name, email, age, dob) VALUES (?, ?, ?, ?)`, [name, email, age, dob], function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to submit form');
        } else {
            // Get the last inserted row ID to send back in the response
            const lastId = this.lastID;
            res.status(201).json({ id: lastId });
        }
    });
});

// Define route to delete a user by ID
app.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;

    // Perform database operation to delete user by ID
    db.run('DELETE FROM users WHERE id = ?', userId, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to delete user');
        } else {
            // After deletion, reset the ID sequence in the table
            db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'users', (seqErr) => {
                if (seqErr) {
                    console.error('Error resetting sequence:', seqErr);
                    res.sendStatus(500);
                } else {
                    console.log('Sequence reset successfully.');
                    res.sendStatus(200);
                }
            });
        }
    });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
