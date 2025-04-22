// Simple secure JavaScript program: User Input Validation

function greetUser() {
  // Get user input
  let userName = prompt("Please enter your name:");

  // Validate input (check if it's not empty and is a valid string)
  if (userName.trim() === "") {
      alert("Name cannot be empty!");
      return;
  }

  // Prevent XSS by safely encoding the user input before displaying it
  let safeUserName = userName.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // If input is valid, greet the user
  alert("Hello, " + safeUserName + "!");
}

// Run the function
greetUser();
