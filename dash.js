document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const tableBody = document.getElementById("articlesTable");

  function renderBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    tableBody.innerHTML = "";

    if (blogs.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted);">Aucun article rédigé pour le moment.</td></tr>`;
      return;
    }

    blogs.forEach(blog => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${blog.title}</strong></td>
        <td>${blog.date}</td>
        <td><button class="btn btn-danger" data-id="${blog.id}">Supprimer</button></td>
      `;
      tableBody.appendChild(row);
    });
  }

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = Number(btn.dataset.id);

    if (confirm("Voulez-vous supprimer cet article ?")) {
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs = blogs.filter(blog => blog.id !== id);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      renderBlogs();
      showToast("Article supprimé.", "success");
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
  });

  renderBlogs();
});
