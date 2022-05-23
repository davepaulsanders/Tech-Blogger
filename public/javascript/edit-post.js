const handlePostEdit = async (event) => {
  event.preventDefault();
  let id = event.target.closest("[href]").getAttribute("href").split("/");
  id = id[id.length - 1];

  const response = await fetch(`/dashboard/edit/${id}`);

  if (response.ok) {
    document.location.replace(`/dashboard/edit/${id}`);
  }
};

document.querySelectorAll(".edit").forEach((btn) => {
  btn.addEventListener("click", handlePostEdit);
});
