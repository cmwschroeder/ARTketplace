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