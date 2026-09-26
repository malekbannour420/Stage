document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("blog-grid");
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogs.length === 0) {
    grid.innerHTML = `<div class="empty-state">Aucun article publié pour le moment. Revenez bientôt !</div>`;
    return;
  }

  grid.innerHTML = "";
  blogs
    .slice()
    .reverse()
    .forEach(blog => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3>${escapeHtml(blog.title)}</h3>
        <div class="card-date">${escapeHtml(blog.date)}</div>
        <p>${escapeHtml(blog.content).slice(0, 140)}${blog.content.length > 140 ? "…" : ""}</p>
      `;
      grid.appendChild(card);
    });
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
