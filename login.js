document.getElementById("loginForm").addEventListener("submit", function (e) {
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

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const match = users.find(u => u.email === email && u.password === password);

  if (!match) {
    showToast("Email ou mot de passe incorrect.", "error");
    return;
  }

  localStorage.setItem("userLoggedIn", "true");
  localStorage.setItem("currentUser", match.name);

  const delay = showToast("Connexion réussie !", "success");
  setTimeout(() => {
    window.location.href = "dash.html";
  }, delay - 300);
});
