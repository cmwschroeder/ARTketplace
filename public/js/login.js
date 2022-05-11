const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const signupBtn = document.querySelector("#create-btn");
const loginBtn = document.querySelector("#login-btn");

signupBtn.addEventListener("click", (event) => {
    loginForm.classList.add("hidden");
    loginForm.classList.remove("flex");
    signupForm.classList.remove("hidden");
    signupForm.classList.add("flex");

    console.log("Function Ran!");
});

loginBtn.addEventListener("click", (event) => {
    signupForm.classList.add("hidden");
    signupForm.classList.remove("flex");
    loginForm.classList.remove("hidden");
    loginForm.classList.add("flex");

    console.log("Function Ran!");

})

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('.login-form')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('click', signupFormHandler);