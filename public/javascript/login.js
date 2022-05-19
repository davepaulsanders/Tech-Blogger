const logIn = document.querySelector(".log-in");
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
    document.location.reload().replace("/dashboard");
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
    document.location.replace("/dashboard");
  } else {
    console.log("Sorry, something went wrong");
  }
};

logIn.addEventListener("click", handleLogIn);
signUp.addEventListener("click", handleSignUp);
