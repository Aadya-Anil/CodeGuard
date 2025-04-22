// vul-test.js

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 🚨 XSS Vulnerability
app.get('/greet', (req, res) => {
  const name = req.query.name || 'guest';
  res.send(`<h1>Welcome, ${name}!</h1>`); // Unsanitized input rendered in HTML
});

// 🚨 Insecure File Access (Path Traversal)
app.get('/file', (req, res) => {
  const filename = req.query.filename;
  const filepath = path.join(__dirname, 'public', filename); // No path sanitization

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.send(data);
  });
});

app.listen(3001, () => {
  console.log('Vulnerable server running on port 3001');
});
