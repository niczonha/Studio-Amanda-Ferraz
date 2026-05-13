const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./authRoutes");
const authMiddleware = require("./authMiddleware");

const app = express();

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors()); // Permite requisições do seu front-end
app.use(express.json()); // Lê o body como JSON

// ─── Rotas públicas ───────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── Exemplo de rota protegida (exige login) ──────────────────────────────────
app.get("/api/perfil", authMiddleware, (req, res) => {
  res.json({
    message: "Você está autenticado!",
    user: req.user,
  });
});

// ─── Iniciar servidor ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});