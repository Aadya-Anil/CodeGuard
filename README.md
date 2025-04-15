# CodeGuard
Copilot Hackathon

CodeGuard is a robust Node.js application designed to enhance code security by automating vulnerability scans and notifying developers about potential issues in real-time. Using GitHub webhooks, CodeGuard listens for repository changes, performs security analysis, and integrates with external services like SonarCloud or Power Automate for seamless notifications.

Features
GitHub Webhook Integration: Monitors code changes (push events, pull requests).

Security Scanning: Analyzes code for vulnerabilities (e.g., SQL injection, XSS).

Notification System: Alerts via email, Microsoft Teams, or task creation using Power Automate.

Cloud Deployment: Hosted on Azure App Services for public accessibility.

Setup Instructions
Step 1: Create a GitHub Repository
Go to GitHub and create a new repository.

Clone the repository to your local machine to start working on the code.

Step 2: Set Up GitHub Webhook
Go to your repository's settings → Webhooks → Add webhook.

Set the Payload URL to your deployed server's endpoint (e.g., https://your-app.azurewebsites.net/webhook).

Choose application/json as the Content Type.

Select the desired events (e.g., Push or Pull Requests).

Step 3: Install Dependencies
Run the following commands in your project directory to install required packages:

bash
npm init -y
npm install express body-parser axios
Step 4: Deploy on Azure
Log into the Azure Portal and create a new Web App.

Deploy your Node.js app to the Azure App Service.

Step 5: Add Security Analysis
Integrate external tools like SonarCloud or CodeQL for vulnerability scanning.

Customize the /webhook endpoint in index.js to process and analyze code changes.

Step 6: Enable Notifications
Set up Power Automate to send alerts based on scan results:

Create a flow using "When an HTTP request is received."

Link the flow to your Node.js server for notifications.

Step 7: Test the System
Push code changes or create pull requests to test webhook triggers and the security analysis workflow.

Technologies Used
Node.js

Express.js

Azure App Services

SonarCloud (or equivalent security tools)

Power Automate

API Endpoints
/webhook
Method: POST

Description: Receives events from GitHub webhooks, performs security analysis, and triggers notifications.

Sample Request:

json
{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "title": "Update README"
  },
  "repository": {
    "name": "CodeGuard"
  }
}
Contribution Guidelines
Fork the repository and create a new branch for your feature.

Ensure your code follows proper linting and testing standards.

Submit a pull request for review.
