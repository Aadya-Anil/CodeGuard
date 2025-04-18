// sql-injection-example.js

const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});

app.use(express.json());

app.get('/user', (req, res) => {
  const username = req.query.username;

  // ❌ VULNERABLE: Directly injecting user input into SQL query
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
