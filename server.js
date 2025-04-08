// Import the express package and other necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Create an express app
const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a route to handle POST requests from GitHub webhook
app.post('/webhook', async (req, res) => {
  // Print the payload (received data from GitHub)
  console.log('Received data:', req.body);

  // Example: Check if the webhook is related to a new pull request or push event
  const { action, pull_request, repository, ref } = req.body;

  if (action === 'opened' || action === 'synchronize') {
    // Log when a pull request is opened or synchronized
    console.log(`Pull request #${pull_request.number} in ${repository.name} was updated`);

    // Trigger SonarCloud analysis after a pull request event
    const analysisResult = await analyzeCodeWithSonarCloud(repository);
    
    if (analysisResult && analysisResult.issues.length > 0) {
      console.log('Security issues found:', analysisResult.issues);
      // You can implement further actions here, like sending alerts to teams or developers
    } else {
      console.log('No issues found in the code');
    }
  }

  // Send a response back to GitHub
  res.status(200).send('Webhook received and processed');
});

// Function to analyze code with SonarCloud
async function analyzeCodeWithSonarCloud(repository) {
  try {
    // Send an API request to SonarCloud for analysis
    const response = await axios.post('https://sonarcloud.io/api/scan', {
      token: 'bfdd2c1dacf89cc7f3d70155a5532c5b8bbd08e2',  // Replace with your actual SonarCloud API token
      repo: repository.name,      // Your GitHub repository name
    });

    // Return the analysis result from SonarCloud
    return response.data;
  } catch (error) {
    console.error('Error analyzing with SonarCloud:', error);
    return null;
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
