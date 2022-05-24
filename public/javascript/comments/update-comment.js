
// Update comment text
const handleUpdateComment = async (event) => {
  event.preventDefault();
  // get comment id from data attribute
  const id = document.querySelector(".comment-id").getAttribute("data-id");
  const commentText = document.querySelector(".comment-text").value.trim();
  
  const response = await fetch(`/api/comments/${id}`, {
    method: "put",
    body: JSON.stringify({
      commentText,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  }
};
document
  .querySelector(".save-comment")
  .addEventListener("click", handleUpdateComment);
