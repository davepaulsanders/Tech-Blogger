const logOut = document.querySelector(".log-out");

const handleLogOut = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload().replace("/dashboard");
  }
};

logOut.addEventListener("click", handleLogOut);
