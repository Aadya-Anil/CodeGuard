const input = "' OR 1=1 --"; 
const query = `SELECT * FROM users WHERE username = '${input}'`;
