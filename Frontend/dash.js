const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const tableBody = document.getElementById("articlesTable");

  async function renderBlogs() {
    try {
      const res = await fetch(`${API_URL}/blogs/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }

      const blogs = await res.json();
      tableBody.innerHTML = "";

      if (blogs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted);">Aucun article rédigé pour le moment.</td></tr>`;
        return;
      }

      blogs.forEach(blog => {
        const date = new Date(blog.createdAt).toLocaleDateString("fr-FR");
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a href="blog-details.html?id=${blog._id}"><strong>${blog.title}</strong></a></td>
          <td>${date}</td>
          <td><button class="btn btn-danger" data-id="${blog._id}">Supprimer</button></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (err) {
      showToast("Impossible de contacter le serveur.", "error");
    }
  }

  tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = btn.dataset.id;

    if (!confirm("Voulez-vous supprimer cet article ?")) return;

    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Erreur lors de la suppression.", "error");
        return;
      }

      showToast("Article supprimé.", "success");
      renderBlogs();
    } catch (err) {
      showToast("Impossible de contacter le serveur.", "error");
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  renderBlogs();
});