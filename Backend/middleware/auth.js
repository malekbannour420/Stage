const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "liona-secret-dev-key";
// ⚠️ En production, définissez JWT_SECRET dans le fichier .env (ne jamais committer .env)

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session invalide ou expirée." });
  }
}

module.exports = { requireAuth, JWT_SECRET };
