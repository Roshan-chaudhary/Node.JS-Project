
const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const app = express();
app.listen(9000)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'Password123#@!',
    database: 'Roshan',
  });



  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  })



// Create a table if it doesn't exist or create in mysql name , email, number not id
const createTableSQL = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    number VARCHAR(20)
)
`;

connection.query(createTableSQL, (createErr) => {
if (createErr) {
    console.error('Error creating table: ' + createErr.message);
} else {
    console.log('Table users created users');
}
});


// index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Sucess.html
app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});



app.post('/submit', (req, res) => {
    const { name, email, number } = req.body;

    const sql = 'INSERT INTO Roshan.users (name, email, number) VALUES (?, ?, ?)';
    const values = [name, email, number];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('MySQL error: ' + err.message);
            res.send('Error submitting the form');
        } else {
            console.log('Record inserted: ' + result.insertId);
          //  res.send('Form submitted successfully');
            res.redirect('/success');

        }
    });
});


