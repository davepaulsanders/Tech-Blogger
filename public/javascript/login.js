const logInButton = document.querySelector(".log-in-submit");
const signUpButton = document.querySelector(".sign-up-submit");

// variables for validation messages
const badLogIn = document.querySelector(".bad-log-in");
const badSignUp = document.querySelector(".bad-sign-up");

// log in
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector(".login-email").value.trim();
  const password = document.querySelector(".login-password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      badLogIn.textContent = "Incorrect email/password combination";
    }
  } else {
    badLogIn.textContent = "Please fill out all fields";
  }
}

// sign up
async function signUpFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector(".signup-username").value.trim();
  const email = document.querySelector(".signup-email").value.trim();
  const password = document.querySelector(".signup-password").value.trim();

  if (!username || !email || !password) {
    badSignUp.textContent = "Please fill out all fields";
  }
  if (password.length < 6) {
    badSignUp.textContent = "Password must be at least 6 characters!"
    return
  }
  
  if (email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      document.location.replace("/");
    } else {
      badSignUp.textContent = "Something went wrong";
    }
  }
}

logInButton.addEventListener("click", loginFormHandler);
signUpButton.addEventListener("click", signUpFormHandler);
