const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para porta 465, false para outras
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envia o e-mail de recuperação de senha
 * @param {string} toEmail - E-mail do destinatário
 * @param {string} token - Token de recuperação gerado
 */
async function sendPasswordResetEmail(toEmail, token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${token}`;

  await transporter.sendMail({
    from: `"Sistema de Login" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Recuperação de senha",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>Recuperação de senha</h2>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
        <p>Clique no botão abaixo para criar uma nova senha. O link expira em <strong>1 hora</strong>.</p>
        <a href="${resetLink}"
           style="display:inline-block; padding: 12px 24px; background:#4f46e5;
                  color:#fff; text-decoration:none; border-radius:6px; margin:16px 0;">
          Redefinir senha
        </a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
        <hr/>
        <small>Link direto: ${resetLink}</small>
      </div>
    `,
  });
}

module.exports = { sendPasswordResetEmail };