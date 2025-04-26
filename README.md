# CodeGuard: Automated Security Analysis for GitHub Repositories

## Overview
CodeGuard is a system that integrates GitHub webhooks with a Node.js-based API to automate security analysis on code changes. It detects vulnerabilities using external tools like SonarCloud and CodeQL, and notifies users via Power Automate.

## Features
- Monitors GitHub repository for code changes.
- Performs security scans using SonarCloud and CodeQL.
- Sends notifications if vulnerabilities are detected.

## Components
- **GitHub Webhook**: Listens for push events and pull requests.
- **Node.js/Express API**: Handles webhook events and triggers security analysis.
- **Security Analysis**: Scans code using SonarCloud or custom validation.
- **Azure Deployment**: Hosts the API for public access.
- **Power Automate**: Sends alerts when vulnerabilities are found.

## Working of the Prototype
**1. GitHub Repository**
- Developers make changes to the code (like pushing commits or opening pull requests) in a GitHub repository.
- GitHub is set up with a Webhook — basically, a "listener" that sends a message whenever something happens in the repository.

**2. Webhook Event**
- When a code change happens, GitHub sends a notification (in the form of a JSON file) to the CodeGuard Server.
- This notification includes information like what files changed, who made the change, which branch, etc.

**3. Node.js/Express Server (Running on Port 3000)**
- The CodeGuard server is a Node.js app hosted publicly (e.g., on Azure).
- It is always listening for incoming messages (events) from GitHub, specifically on port 3000 internally.
- Once it receives a GitHub event, it understands it and decides what to do next.

**4. Trigger Security Analysis**
Based on the event, the server automatically starts security scanning of the code; SonarCloud checks for bugs, vulnerabilities, and code smells.

**5. Analyze Scan Results**
After scanning:
If no issues are found, no action is needed.

If vulnerabilities or issues are found, the system gets ready to notify the developers.

**6. Notification via Power Automate**
When a security issue is found, the server calls a Power Automate flow.
Power Automate then sends alerts — typically an email, Teams notification, or any other configured method — to inform developers about the issues.

### Full Flow in One Line:
Developer changes code → GitHub sends event → CodeGuard server receives it → Security scan runs → If vulnerabilities found → Notification sent automatically.

## Why This System is Useful
- Developers are immediately alerted about security issues.
- No manual scanning is needed — everything happens automatically.
- Saves time and maintains a secure codebase.

 ## Future Scope of CodeGuard 
- Multi-Scanner Integration: Add support for tools like Snyk, Trivy, and OWASP Dependency-Check.
- Risk-Based Prioritization: Rank vulnerabilities by severity (Critical, High, Medium, Low).
- AI-Based Fix Suggestions: Use AI models to suggest automatic fixes for detected issues.
- Dashboard Visualization: Create a frontend dashboard to display scan results, trends, and security scores.
- Smart Notifications: Send alerts based on severity, code ownership, or developer teams.
- CI/CD Pipeline Integration: Connect CodeGuard directly with GitHub Actions or Azure Pipelines for pre-merge scanning.
- Enhanced Security: Secure webhook events using GitHub secrets and server authentication.
- Auto Remediation Actions: Automate simple fixes or block merges for critical vulnerabilities.
- Historical Data Tracking: Store past scan results to show improvement or detect recurring issues.

## Summary
CodeGuard automatically checks for security issues in your code and alerts you if vulnerabilities are detected, ensuring a secure development workflow.

