const handlePostDelete = async (event) => {
  event.preventDefault();
  const id = event.target.closest("[data-id]").getAttribute("data-id");
  const response = await fetch(`/api/posts/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  }
};

document.querySelectorAll(".delete").forEach((btn) => {
  btn.addEventListener("click", handlePostDelete);
});
