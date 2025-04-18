// Vulnerable code: SQL Injection

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Database simulation (For the sake of this example)
let users = [
  { id: 1, username: 'admin', password: 'admin123' },
  { id: 2, username: 'user', password: 'password' }
];

// Vulnerable route to simulate login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vulnerable query that can be exploited with SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  // Simulate checking the database
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send('Login successful');
  } else {
    res.send('Invalid credentials');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

eval("console.log('This is bad')");"// test push trigger" 
