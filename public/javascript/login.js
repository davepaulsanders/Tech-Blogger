const logInButton = document.querySelector(".log-in-submit");
const signUpButton = document.querySelector(".sign-up-submit");

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
      alert(response.statusText);
    }
  }
}

async function signUpFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector(".signup-username").value.trim();
  const email = document.querySelector(".signup-email").value.trim();
  const password = document.querySelector(".signup-password").value.trim();
  console.log(email, password);
  if (email && password) {
    const response = await fetch("/api/users/", {
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
      alert(response.statusText);
    }
  }
}

logInButton.addEventListener("click", loginFormHandler);
signUpButton.addEventListener("click", signUpFormHandler);
