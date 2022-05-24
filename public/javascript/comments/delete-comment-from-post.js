
// Delete comment from edit post view
const handleDeleteCommentInEdit = async (event) => {
  event.preventDefault();
  // getting post id from data attribute
  const id = event.target.closest("[data-id]").getAttribute("data-id");

  const response = await fetch(`/api/comments/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const postId = document
      .querySelector(".card-header")
      .getAttribute("data-id");
      // returning to edit post view once comment is deleted
    document.location.replace(`/dashboard/edit/${postId}`);
  }
};

document.querySelectorAll(".delete-comment").forEach((btn) => {
  btn.addEventListener("click", handleDeleteCommentInEdit);
});
