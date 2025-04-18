// Simulating vulnerable code with SQL Injection
const userInput = "' OR 1=1 --"; // Malicious input that will bypass authentication

// Unsafe SQL query construction
const query = `SELECT * FROM users WHERE username = '${userInput}' AND password = 'password'`;

console.log("Generated Query: ", query);

// Assume query is executed in a real database (this is just for simulation)
const database = [
  { username: 'admin', password: 'password' },
  { username: 'user', password: 'userpassword' },
];

// Simulating the query execution
const result = database.filter(user => user.username === userInput.split(' ')[0]);
console.log("Query Result: ", result);
