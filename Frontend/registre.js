const API_URL = "http://localhost:5000/api";

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-pass").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 3) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("nameError").style.display = "none";
  }

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
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Erreur lors de l'inscription.", "error");
      return;
    }

    const delay = showToast("Compte créé avec succès !", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, delay - 300);
  } catch (err) {
    showToast("Impossible de contacter le serveur.", "error");
  }
});