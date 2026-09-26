document.getElementById("registerForm").addEventListener("submit", function (e) {
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

  if (isValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    const delay = showToast("Compte créé avec succès !", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, delay - 300);
  }
});
