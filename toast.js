// toast.js — notification en haut de page (remplace alert())
// À inclure AVANT les autres scripts de page (ex: <script src="toast.js"></script>)
function showToast(message, type = "success", duration = 2500) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = "toast " + type;

  requestAnimationFrame(() => toast.classList.add("show"));

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);

  return duration;
}
