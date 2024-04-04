// Import required modules
const express = require('express');
const path = require('path');

// Create Express app
const app = express();
const port = 3000; // You can change this to any port you prefer

// Define a route to serve your index.html file
app.get('/', (req, res) => {
  // Send the index.html file located in the 'public' directory
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
