async function acessar() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  erro.style.display = "none";

  if (!email || !senha) {
    erro.textContent = "Preencha todos os campos.";
    erro.style.display = "block";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      erro.textContent = data.error || "Erro ao fazer login.";
      erro.style.display = "block";
      return;
    }

    // Salva o token e redireciona pro dashboard
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "../pages/dashboard.html"; // ajusta o caminho se necessário

  } catch (err) {
    erro.textContent = "Não foi possível conectar ao servidor.";
    erro.style.display = "block";
  }
}