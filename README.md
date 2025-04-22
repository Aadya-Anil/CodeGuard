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

## Summary
CodeGuard automatically checks for security issues in your code and alerts you if vulnerabilities are detected, ensuring a secure development workflow.

