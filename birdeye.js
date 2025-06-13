
const BIRDEYE_API = "cfcc5485796a4e85ac0444fac13dd9a2";

async function fetchTokenInfo(mintAddress) {
  const url = `https://public-api.birdeye.so/public/token/${mintAddress}`;
  const response = await fetch(url, {
    headers: { "X-API-KEY": BIRDEYE_API }
  });
  const data = await response.json();
  return data.data;
}

async function displayTokenStats() {
  const tokens = [
    { name: "ZORBO", mint: "So11111111111111111111111111111111111111112" },
    { name: "NEONX", mint: "So11111111111111111111111111111111111111112" },
    { name: "GLITCH", mint: "So11111111111111111111111111111111111111112" }
  ];

  const panel = document.getElementById("token-panel");
  panel.innerHTML = "";

  for (let token of tokens) {
    try {
      const data = await fetchTokenInfo(token.mint);

      const bonding = data?.bondingProgress ? `${data.bondingProgress.toFixed(2)}%` : "N/A";
      const vol = data?.volume_24h ? `$${parseInt(data.volume_24h).toLocaleString()}` : "N/A";
      const mc = data?.market_cap ? `$${parseInt(data.market_cap).toLocaleString()}` : "N/A";

      const row = document.createElement("div");
      row.className = "risk-row";
      row.innerHTML = `
        <div><strong>${token.name}</strong></div>
        <div>Bonding: ${bonding}</div>
        <div>24h Vol: ${vol}</div>
        <div>MC: ${mc}</div>
      `;
      panel.appendChild(row);
    } catch (err) {
      console.error("Error fetching token data for", token.name, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", displayTokenStats);
