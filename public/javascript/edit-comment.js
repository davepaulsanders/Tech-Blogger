const deleteButton = document.querySelector(".delete-comment");

const handleDeleteComment = async (event) => {
  event.preventDefault();
  const id = event.target.closest("[data-id]").getAttribute("data-id");
  console.log(id);
  const response = await fetch(`/api/comments/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  }
};

deleteButton.addEventListener("click", handleDeleteComment);
