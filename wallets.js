async function loadWallets() {
  const res = await fetch("wallets.json");
  const wallets = await res.json();

  function classifyWallet(wallet) {
    const { txCount, bondedTokens, firstBuySpeed, repeatedBuys, totalProfit } = wallet;
    if (txCount <= 2 && firstBuySpeed < 1.5 && bondedTokens === 1) return "dev";
    if (firstBuySpeed < 5 && repeatedBuys >= 3) return "sniper";
    if (bondedTokens > 5 && totalProfit > 5) return "smart";
    if (txCount >= 5 && totalProfit < -2) return "dump";
    return "unknown";
  }

  function scoreWallet(wallet) {
    const speedScore = Math.max(0, 10 - wallet.firstBuySpeed) * 10;
    const bondingScore = Math.min(wallet.bondedTokens, 10) * 5;
    const txScore = Math.min(wallet.txCount, 20) * 2;
    const repeatScore = Math.min(wallet.repeatedBuys, 5) * 6;
    const profitScore = Math.min(wallet.totalProfit, 20) * 2;
    return Math.round((speedScore + bondingScore + txScore + repeatScore + profitScore) / 5);
  }

  const container = document.getElementById("wallet-intel");
  wallets.forEach(wallet => {
    const type = classifyWallet(wallet);
    const score = scoreWallet(wallet);
    const row = document.createElement("div");
    row.className = "wallet-row";
    row.innerHTML = `
      <div><strong>${wallet.address}</strong> 
        <span class="badge ${type}">${type.toUpperCase()}</span> 
        <span class="score">Score: ${score}/100</span> 
        <button class="toggle-btn">Details ▼</button>
      </div>
      <div class="wallet-details" style="display: none;">
        <p>Tx Count: ${wallet.txCount}</p>
        <p>Bonded Tokens: ${wallet.bondedTokens}</p>
        <p>First Buy Speed: ${wallet.firstBuySpeed}s</p>
        <p>Repeated Buys: ${wallet.repeatedBuys}</p>
        <p>Total Profit: ${wallet.totalProfit} SOL</p>
      </div>
    `;
    container.appendChild(row);
  });

  document.querySelectorAll(".toggle-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const detail = document.querySelectorAll(".wallet-details")[i];
      const visible = detail.style.display === "block";
      detail.style.display = visible ? "none" : "block";
      btn.textContent = visible ? "Details ▼" : "Hide ▲";
    });
  });
}
document.addEventListener("DOMContentLoaded", loadWallets);
