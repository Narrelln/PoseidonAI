
const HELIUS_KEY = "4f5e9d85-690a-4420-899d-4d9d5cac9171";

async function fetchWalletActivity(walletAddress) {
  const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;

  const body = {
    jsonrpc: "2.0",
    id: "poseidon",
    method: "getSignaturesForAddress",
    params: [walletAddress, { limit: 10 }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  return result.result || [];
}

async function displayWalletFeed() {
  const wallet = "9oNKa5uFGnAU7Bbi6Uokx39hL1VjP65GH8zkZv5wnhft"; // example wallet
  const feed = await fetchWalletActivity(wallet);

  const panel = document.getElementById("wallet-feed");
  panel.innerHTML = "";

  feed.forEach(tx => {
    const row = document.createElement("div");
    row.className = "convergence-row";
    row.innerHTML = `
      <div><strong>TX:</strong> ${tx.signature.slice(0, 12)}...</div>
      <div><strong>Slot:</strong> ${tx.slot}</div>
      <div><strong>Time:</strong> ${new Date(tx.blockTime * 1000).toLocaleTimeString()}</div>
    `;
    panel.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", displayWalletFeed);
