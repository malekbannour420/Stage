const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "Le nom doit comporter au moins 3 caractères." });
    }
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Adresse email invalide." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit comporter au moins 6 caractères." });
    }

    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Un compte existe déjà avec cet email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    res.status(201).json({ message: "Compte créé avec succès !", id: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Adresse email invalide." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Mot de passe invalide." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Connexion réussie !", token, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur. Réessayez plus tard." });
  }
});

module.exports = router;
