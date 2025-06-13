function evaluateExecution(token) {
  const out = document.getElementById("execution-result");
  let msg = token.mc < 30000 ? "✅ Entry Viable" : "⚠️ Entry Late";
  out.innerText = `Market Cap: $${token.mc}\n${msg}`;
}