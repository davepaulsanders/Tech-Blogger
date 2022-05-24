
// This function takes you to the edit post link from the dashboard
const handlePostEdit = async (event) => {
  event.preventDefault();
  // get post id from link
  let id = event.target.closest("[href]").getAttribute("href").split("/");
  id = id[id.length - 1];

  const response = await fetch(`/dashboard/edit/${id}`);

  if (response.ok) {
    // go to post edit view
    document.location.replace(`/dashboard/edit/${id}`);
  }
};

document.querySelectorAll(".edit").forEach((btn) => {
  btn.addEventListener("click", handlePostEdit);
});
