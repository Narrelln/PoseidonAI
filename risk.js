async function loadRiskTokens() {
  const res = await fetch("risk-tokens.json");
  const tokens = await res.json();
  const container = document.getElementById("risk-panel");

  function gradeToken(token) {
    let flags = [], score = 100;
    if (token.bonding > 70) { flags.push("High bonding"); score -= 40; }
    if (token.marketCap > 120000) { flags.push("High market cap"); score -= 30; }
    if (token.marketCap < 30000) { flags.push("Low market cap"); score -= 20; }
    if (token.dumpWallets >= 2) { flags.push("Dump activity"); score -= 30; }
    if (token.smartWallets === 0) { flags.push("No smart wallets"); score -= 20; }

    let grade = "green";
    if (score < 50) grade = "red";
    else if (score < 75) grade = "white";

    return { score, flags, grade };
  }

  tokens.forEach(token => {
    const { score, flags, grade } = gradeToken(token);
    const div = document.createElement("div");
    div.className = "risk-row";
    div.innerHTML = `
      <div><strong>${token.name}</strong></div>
      <div>Score: ${score}/100</div>
      <div><span class="dot ${grade}"></span> ${grade === 'green' ? 'Safe' : grade === 'white' ? 'Caution' : 'High Risk'}</div>
      <div class="flags">Flags: ${flags.join(", ") || "None"}</div>
    `;
    container.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", loadRiskTokens);
