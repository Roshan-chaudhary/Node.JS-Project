const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
app.listen(3000);
// Set the EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));         // If Uploads Directory is Given with image api                
app.use( express.static(path.join(__dirname, 'uploads'  )));                    // Direct image Url in Api



// Define a route to fetch and render API data
app.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.q;  // For Search Query
    // Replace 'your-api-url' with the actual URL of your API
    const apiResponse = await axios.get('http://localhost:9000/api/get');
    const apiData = apiResponse.data;

    res.render('index', { apiData });
  } catch (error) {
    console.error('Error fetching API data:', error);
    res.status(500).send('Error fetching API data');
  }
});

console.log("Run in 3000")