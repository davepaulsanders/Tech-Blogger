const logInButton = document.querySelector(".log-in-submit");
const signUp = document.querySelector(".sign-up");
const loggedIn = document.querySelector(".logged-in");

const handleLogIn = async (event) => {
  event.preventDefault();

  const email = document.querySelector(".login-email").value.trim();
  const password = document.querySelector(".login-password").value.trim();

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("Wrong username/password combination");
  }
};

const handleSignUp = async (event) => {
  event.preventDefault();
  const username = document.querySelector(".signup-username").value.trim();
  const email = document.querySelector(".signup-email").value.trim();
  const password = document.querySelector(".signup-password").value.trim();

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Logged in!");
  } else {
    console.log("Sorry, something went wrong");
  }
};

logInButton.addEventListener("click", handleLogIn);
signUp.addEventListener("click", handleSignUp);
