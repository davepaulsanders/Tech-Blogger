const logOut = document.querySelector(".log-out");

// log out
const handleLogOut = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  }
};

logOut.addEventListener("click", handleLogOut);
