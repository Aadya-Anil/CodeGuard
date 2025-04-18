const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;  // Use dynamic port for Azure

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Root route to check if the app is running
app.get('/', (req, res) => {
  res.send('Hello, your Express app is running!');
});

// Define a function to analyze code with SonarCloud
async function analyzeCodeWithSonarCloud(repository) {
  try {
    const sonarToken = 'bfdd2c1dacf89cc7f3d70155a5532c5b8bbd08e2'; // Your actual SonarCloud token
    const sonarUrl = `https://sonarcloud.io/api/analysis?token=${sonarToken}&repo=${repository.name}`;
    
    const result = await axios.post(sonarUrl);
    return result.data;
  } catch (error) {
    console.error('Error analyzing code with SonarCloud:', error);
    return null;
  }
}

// Define a route to handle POST requests from GitHub webhook
app.post('/webhook', async (req, res) => {
  console.log('📦 Webhook triggered by GitHub:', req.body);


  const { action, pull_request, repository } = req.body;

  if (req.body.ref && req.body.head_commit) {
    // Handle push event
    console.log(`Push event on ${repository.full_name}`);
    const commitId = req.body.head_commit.id;
    const message = req.body.head_commit.message;

    try {
      const response = await axios.post(
        'https://prod-168.westus.logic.azure.com:443/workflows/46312203162d41f88f42b9e60e22952c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GFBFZkThBJhqQouBnU4Jq73RTZmWiU5m-JKye6GWKMk',
        {
          repo_name: repository.full_name,
          commit_id: commitId,
          commit_message: message,
          compare_url: req.body.compare
        }
      );
      console.log('Power Automate flow triggered for push:', response.status);
    } catch (error) {
      console.error('Error triggering Power Automate flow for push:', error.message);
    }

  } else if (action === 'opened' || action === 'synchronize') {
    // Handle pull request event
    console.log(`Pull request #${pull_request.number} in ${repository.name} was updated`);

    const securityIssuesDetected = true; // Example assumption

    if (securityIssuesDetected) {
      try {
        const response = await axios.post(
          'https://prod-168.westus.logic.azure.com:443/workflows/46312203162d41f88f42b9e60e22952c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GFBFZkThBJhqQouBnU4Jq73RTZmWiU5m-JKye6GWKMk',
          {
            message: `Security issue detected in pull request #${pull_request.number} for repo ${repository.name}!`
          }
        );
        console.log('Power Automate flow triggered for PR:', response.status);
      } catch (error) {
        console.error('Error triggering Power Automate flow for PR:', error.message);
      }
    }

    const analysisResult = await analyzeCodeWithSonarCloud(repository);

    if (analysisResult && analysisResult.issues && analysisResult.issues.length > 0) {
      console.log('Security issues found:', analysisResult.issues);
    } else {
      console.log('No issues found in the code');
    }
  }

  res.status(200).send('Webhook processed');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
