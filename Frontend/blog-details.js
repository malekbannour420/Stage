const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blog-detail");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = `<div class="empty-state">Aucun article spécifié.</div>`;
    return;
  }

  try {
    const res = await fetch(`${API_URL}/blogs/${id}`);

    if (res.status === 404) {
      container.innerHTML = `<div class="empty-state">Cet article est introuvable.</div>`;
      return;
    }
    if (!res.ok) {
      container.innerHTML = `<div class="empty-state">Impossible de charger cet article.</div>`;
      return;
    }

    const blog = await res.json();
    const date = new Date(blog.createdAt).toLocaleDateString("fr-FR");

    document.title = `${blog.title} | Liona`;
    container.innerHTML = `
      <article class="form-card" style="max-width: 700px;">
        <h2>${escapeHtml(blog.title)}</h2>
        <div class="card-date">Par ${escapeHtml(blog.authorName)} — ${escapeHtml(date)}</div>
        <p style="white-space: pre-wrap; margin-top: 1rem;">${escapeHtml(blog.content)}</p>
      </article>
    `;
  } catch (err) {
    container.innerHTML = `<div class="empty-state">Impossible de contacter le serveur.</div>`;
  }
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
