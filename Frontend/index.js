const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("blog-grid");

  try {
    const res = await fetch(`${API_URL}/blogs`);
    const blogs = await res.json();

    if (blogs.length === 0) {
      grid.innerHTML = `<div class="empty-state">Aucun article publié pour le moment. Revenez bientôt !</div>`;
      return;
    }

    grid.innerHTML = "";
    blogs.forEach(blog => {
      const date = new Date(blog.createdAt).toLocaleDateString("fr-FR");
      const card = document.createElement("a");
      card.className = "card";
      card.href = `blog-details.html?id=${blog._id}`;
      card.style.textDecoration = "none";
      card.style.display = "block";
      card.innerHTML = `
        <h3>${escapeHtml(blog.title)}</h3>
        <div class="card-date">${escapeHtml(date)}</div>
        <p>${escapeHtml(blog.content).slice(0, 140)}${blog.content.length > 140 ? "…" : ""}</p>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">Impossible de charger les articles pour le moment.</div>`;
  }
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}