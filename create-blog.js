document.getElementById("createBlogForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title.length < 3) {
    document.getElementById("titleError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("titleError").style.display = "none";
  }

  if (content.length < 10) {
    document.getElementById("contentError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("contentError").style.display = "none";
  }

  if (!isValid) return;

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push({
    id: Date.now(),
    title: title,
    content: content,
    date: new Date().toLocaleDateString("fr-FR")
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));

  const delay = showToast("Article ajouté avec succès !", "success");
  setTimeout(() => {
    window.location.href = "dash.html";
  }, delay - 300);
});
