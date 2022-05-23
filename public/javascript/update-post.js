const saveButton = document.querySelector(".save");

const handleUpdatePost = async (event) => {
  event.preventDefault();
  const text = document.querySelector(".post-content").value;
  const id =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const response = await fetch(`/api/posts/${id}`, {
    method: "put",
    body: JSON.stringify({
      text,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace(`/api/posts/${id}`)
  }
};

saveButton.addEventListener("click", handleUpdatePost);
