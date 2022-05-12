const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const signupBtn = document.querySelector("#create-btn");
const loginBtn = document.querySelector("#login-btn");
const mymodal2 = document.querySelector("#my-modal-2");
const mymodal3 = document.querySelector("#mymodal3");
const closeButton3 = document.querySelector("closeButton3");



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
  
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        //Display modal
        mymodal2.classList.add("modal-open")
      }
    }
  };
const closeButton = document.querySelector("#closeButton");
closeButton.addEventListener("click", function() {
  mymodal2.classList.remove("modal-open");
})

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
        //Display modal
        mymodal3.classList.add("modal-open");
      }
    }
  };

if(closeButton3) {
  closeButton3.addEventListener("click", function() {
  mymodal3.classList.remove("modal-open");
});
}

document
  .querySelector('#main-login-btn')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#main-create-btn')
  .addEventListener('click', signupFormHandler);