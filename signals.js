async function loadSignals() {
  const res = await fetch("signals.json");
  const tokens = await res.json();

  function scoreSignal(token) {
    let score = 0;
    if (token.bonding < 40) score += 25;
    if (token.marketCap >= 55000 && token.marketCap <= 80000) score += 25;
    if (token.smartWallets >= 3) score += 25;
    if (token.volume > 8000) score += 25;
    return score;
  }

  const container = document.getElementById("signal-panel");

  tokens.forEach(token => {
    const score = scoreSignal(token);
    const signal = document.createElement("div");
    signal.className = "signal-row";
    signal.innerHTML = `
      <div><strong>${token.name}</strong> | Score: ${score}/100 
        ${score >= 75 ? "🔔 Strong Buy" : score >= 50 ? "🟡 Watch" : "⛔ Skip"}
      </div>
    `;
    container.appendChild(signal);
  });
}

document.addEventListener("DOMContentLoaded", loadSignals);
