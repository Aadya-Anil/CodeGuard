const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
  const ip = req.query.ip;

  // ⚠️ Vulnerable to command injection: no input validation
  exec(`ping -c 1 ${ip}`, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
