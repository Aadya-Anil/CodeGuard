// Import the express package
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Create an express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a route to handle POST requests from GitHub webhook
app.post('/webhook', async (req, res) => {
  // Print the payload (received data from GitHub)
  console.log('Received data:', req.body);

  // Example: Check if the webhook is related to a new pull request
  const { action, pull_request, repository } = req.body;

  if (action === 'opened' || action === 'synchronize') {
    // Example of a simple log for a new pull request
    console.log(`Pull request #${pull_request.number} in ${repository.name} was updated`);

    // You could add security checks here or trigger other tasks, e.g., an analysis service
    const result = await axios.post('https://example.com/analyze', { code: 'sample code' });
    console.log('Analysis result:', result.data);
  }

  // Send a response back to GitHub
  res.status(200).send('Webhook received and processed');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
