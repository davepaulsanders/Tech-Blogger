const id = document.querySelector(".comment-id").getAttribute("data-id");

const handleDeleteCommentInEdit = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/comments/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  }
};

document
  .querySelector(".delete-comment")
  .addEventListener("click", handleDeleteCommentInEdit);
