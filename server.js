const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;  // Use dynamic port for Azure

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define a function to analyze code with SonarCloud
async function analyzeCodeWithSonarCloud(repository) {
  try {
    const sonarToken = 'bfdd2c1dacf89cc7f3d70155a5532c5b8bbd08e2'; // Replace with your actual SonarCloud token
    const sonarUrl = `https://sonarcloud.io/api/analysis?token=${sonarToken}&repo=${repository.name}`;
    
    // Make a request to SonarCloud API (Modify the API request according to your needs)
    const result = await axios.post(sonarUrl);
    return result.data;
  } catch (error) {
    console.error('Error analyzing code with SonarCloud:', error);
    return null;
  }
}

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
    
    if (analysisResult && analysisResult.issues && analysisResult.issues.length > 0) {
      console.log('Security issues found:', analysisResult.issues);
      // You can implement further actions here, like sending alerts to teams or developers
    } else {
      console.log('No issues found in the code');
    }
  }

  // Send a response back to GitHub
  res.status(200).send('Webhook received and processed');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
