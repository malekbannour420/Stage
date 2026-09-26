const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("API Liona en ligne ✅");
});

app.listen(PORT, () => {
  console.log(`Serveur Liona démarré sur http://localhost:${PORT}`);
});
