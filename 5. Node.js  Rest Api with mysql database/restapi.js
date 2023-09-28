
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
app.listen(9000);

  // For Render Html File
  //app.use(express.static(__dirname));   // For Render Html File


  //  Mysql Connection 

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Password123#@!',
  database: 'Roshan',
});

// Connect to the database

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
})


// Create the "items" table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  des TEXT,
  image VARCHAR(255)
)
`;

connection.query(createTableQuery, (error, results) => {
if (error) {
  console.error('Error creating table:', error);
} else {
  console.log('Table "items" has been created or already exists.');
}
});




// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to parse JSON
app.use(express.json());




// Get method

// POST Method to insert an item
app.post('/api/post', upload.single('image'), async (req, res) => {
  try {
    const { item, price, des } = req.body;
   // const image = req.file ? req.file.path : '';     // for uploads path given in api 
   const image = req.file ? req.file.filename : '';     // For Direct Image Url given in Api

    const insertQuery = `
      INSERT INTO items (item, price, des, image)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(insertQuery, [item, price, des, image], (error, results) => {
      if (error) {
        console.error('Error inserting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const newItem = { id: results.insertId, item, price, des, image };
        res.status(201).json(newItem);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Method to retrieve all items
app.get('/api/get', async (req, res) => {
  try {
    const selectQuery = `
      SELECT * FROM items
    `;

    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get method by Id 

// GET Method to retrieve an item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const selectQuery = `
      SELECT * FROM items WHERE id = ?
    `;

    connection.query(selectQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        const item = results[0];
        res.json(item);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});













// DELETE Method to delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const deleteQuery = `
      DELETE FROM items WHERE id = ?
    `;

    connection.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json("Item Deleted Successfully");
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT Method to update an item by ID
app.put('/api/items/:id', upload.single('image'), async (req, res) => {
  try {
    const { item, price, des } = req.body;
    const image = req.file ? req.file.path : '';

    const updateQuery = `
      UPDATE items
      SET item = ?, price = ?, des = ?, image = ?
      WHERE id = ?
    `;

    connection.query(updateQuery, [item, price, des, image, req.params.id], (error, results) => {
      if (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json({ message: 'Item Updated Successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


console.log("Run in the Port 9000")



















