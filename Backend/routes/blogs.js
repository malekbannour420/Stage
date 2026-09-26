const express = require("express");
const { readData, writeData } = require("../utils/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/blogs -> tous les articles (page d'accueil, public)
router.get("/", (req, res) => {
  const blogs = readData("blogs");
  res.json(blogs.slice().reverse());
});

// GET /api/blogs/mine -> articles de l'utilisateur connecté (dashboard)
router.get("/mine", requireAuth, (req, res) => {
  const blogs = readData("blogs");
  const mine = blogs.filter(b => b.userId === req.user.id);
  res.json(mine.slice().reverse());
});

// POST /api/blogs -> créer un article (protégé)
router.post("/", requireAuth, (req, res) => {
  const { title, content } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "Le titre doit comporter au moins 3 caractères." });
  }
  if (!content || content.trim().length < 10) {
    return res.status(400).json({ message: "Le contenu doit comporter au moins 10 caractères." });
  }

  const blogs = readData("blogs");
  const newBlog = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    date: new Date().toLocaleDateString("fr-FR"),
    userId: req.user.id,
    authorName: req.user.name
  };

  blogs.push(newBlog);
  writeData("blogs", blogs);

  res.status(201).json({ message: "Article ajouté avec succès !", blog: newBlog });
});

// DELETE /api/blogs/:id -> supprimer un article (protégé, seulement le sien)
router.delete("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const blogs = readData("blogs");
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Article introuvable." });
  }
  if (blog.userId !== req.user.id) {
    return res.status(403).json({ message: "Vous ne pouvez pas supprimer cet article." });
  }

  const updated = blogs.filter(b => b.id !== id);
  writeData("blogs", updated);

  res.json({ message: "Article supprimé." });
});

module.exports = router;
