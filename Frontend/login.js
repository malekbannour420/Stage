const API_URL = "http://localhost:5000/api";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  if (password.length < 6) {
    document.getElementById("passError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("passError").style.display = "none";
  }

  if (!isValid) return;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Erreur de connexion.", "error");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", data.name);

    const delay = showToast("Connexion réussie !", "success");
    setTimeout(() => {
      window.location.href = "dash.html";
    }, delay - 300);
  } catch (err) {
    showToast("Impossible de contacter le serveur.", "error");
  }
});