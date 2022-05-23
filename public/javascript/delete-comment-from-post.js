const handleDeleteCommentInEdit = async (event) => {
  const id = event.target.closest("[data-id]").getAttribute("data-id");
  event.preventDefault();
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

document.querySelectorAll(".delete-comment").forEach((btn) => {
  btn.addEventListener("click", handleDeleteCommentInEdit);
});
