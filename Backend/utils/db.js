const mongoose = require("mongoose");
const dns = require("dns");

// Certains réseaux Wi-Fi/routeurs bloquent ou ne supportent pas les requêtes DNS
// de type SRV (nécessaires pour "mongodb+srv://"). On force l'utilisation du
// DNS public de Google pour contourner ce problème.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI manquant dans le fichier .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connecté à MongoDB");
  } catch (err) {
    console.error("❌ Échec de connexion à MongoDB :", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;