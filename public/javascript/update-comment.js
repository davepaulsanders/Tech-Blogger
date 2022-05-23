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

const handleUpdateComment = async (event) => {
  event.preventDefault();
  const commentText = document.querySelector(".comment-text").value.trim();
  const response = await fetch(`/api/comments/${id}`, {
    method: "put",
    body: JSON.stringify({
      commentText,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard/edit/comment/${id}`);
  }
};

document
  .querySelector(".delete-comment")
  .addEventListener("click", handleDeleteCommentInEdit);

document
  .querySelector(".save-comment")
  .addEventListener("click", handleUpdateComment);
