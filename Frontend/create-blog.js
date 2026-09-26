const API_URL = "http://localhost:5000/api";

document.getElementById("createBlogForm").addEventListener("submit", async function (e) {
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

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Erreur lors de la publication.", "error");
      return;
    }

    const delay = showToast("Article ajouté avec succès !", "success");
    setTimeout(() => {
      window.location.href = "dash.html";
    }, delay - 300);
  } catch (err) {
    showToast("Impossible de contacter le serveur.", "error");
  }
});