const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware que protege rotas privadas.
 * Uso: adicione authMiddleware antes do handler da rota.
 *
 * Exemplo:
 *   router.get("/perfil", authMiddleware, (req, res) => {
 *     res.json({ user: req.user });
 *   });
 *
 * O front-end deve enviar o token no header:
 *   Authorization: Bearer <token>
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Token não fornecido." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

module.exports = authMiddleware;