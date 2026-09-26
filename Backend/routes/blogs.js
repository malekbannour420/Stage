const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/blogs -> tous les articles (page d'accueil, public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

// GET /api/blogs/mine -> articles de l'utilisateur connecté (dashboard)
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

// GET /api/blogs/:id -> détail d'un article (public, page de détail)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Identifiant d'article invalide." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Article introuvable." });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

// POST /api/blogs -> créer un article (protégé)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ message: "Le titre doit comporter au moins 3 caractères." });
    }
    if (!content || content.trim().length < 10) {
      return res.status(400).json({ message: "Le contenu doit comporter au moins 10 caractères." });
    }

    const newBlog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      userId: req.user.id,
      authorName: req.user.name
    });

    res.status(201).json({ message: "Article ajouté avec succès !", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

// DELETE /api/blogs/:id -> supprimer un article (protégé, seulement le sien)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Identifiant d'article invalide." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Article introuvable." });
    }
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Vous ne pouvez pas supprimer cet article." });
    }

    await blog.deleteOne();
    res.json({ message: "Article supprimé." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

module.exports = router;
