const logIn = document.querySelector(".log-in");

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
    document.location.replace("/dashboard");
  } else {
    console.log("You don't have an account");
  }
};

logIn.addEventListener("click", handleLogIn);
