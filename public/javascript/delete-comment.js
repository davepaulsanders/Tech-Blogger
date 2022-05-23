const handleDeleteComment = async (event) => {
  event.preventDefault();
  const id = event.target.closest("[data-id]").getAttribute("data-id");
  console.log(id);
  const response = await fetch(`/api/comments/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const postId = document
      .querySelector(".card-header")
      .getAttribute("data-id");
    document.location.replace(`/dashboard/edit/${postId}`);
  }
};

const deleteButton = document
  .querySelectorAll(".delete-comment")
  .forEach((btn) => {
    btn.addEventListener("click", handleDeleteComment);
  });
