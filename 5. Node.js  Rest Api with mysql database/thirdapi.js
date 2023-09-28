const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');
const app = express();
app.listen(9001)

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));







// Define a route to fetch and display the API data
app.get('/api', async (req, res) => {
  try {
  const query = req.query.q;   // For Search Query only write
  let apiUrl ='https://newsapi.org/v2/everything?q=news&apiKey=2c6bfa81c2e8403da6eff5d85b8d1432';  // API URL 
  
 // If a search query is provided, update the API URL to include the query
    if (query) {
      apiUrl += `&q=${query}`;
    }
   
    // Make an HTTP GET request to the API
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the API response
    const apiData = response.data.articles; // Assuming the API response structure matches the example you provided

   // Render the EJS template and pass the data
   res.render('thirdapi', { articles: apiData, query });  // Remove Query if not want in Project Seach bar
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Another Api 

app.get('/', async (req, res) => {
  try {
  const query = req.query.q;   // For Search Query only write
  let apiUrl ='https://newsapi.org/v2/top-headlines?country=us&apiKey=60dc141986e64bec9611c24ade739e31 ';  // API URL 
  
 // If a search query is provided, update the API URL to include the query
    if (query) {
      apiUrl += `&q=${query}`;
    }
   
    // Make an HTTP GET request to the API
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the API response
    const apiData = response.data.articles; // Assuming the API response structure matches the example you provided

   // Render the EJS template and pass the data
   res.render('thirdapi', { articles: apiData, query });  // Remove Query if not want in Project Seach bar
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Internal Server Error');
  }
});


// * Serve static files from the 'public' directory   //

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));         // If Uploads Directory is Given with image api                
app.use( express.static(path.join(__dirname, 'uploads'  )));                    // Direct image Url in Api



// Define a route to fetch and render API data
app.get('/news', async (req, res) => {
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
















console.log("Run in the Port  9001")