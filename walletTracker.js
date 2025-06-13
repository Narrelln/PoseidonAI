const trackedWallets = {
  "Groovy": "34ZEH778zL8ctkLwxxERLX5ZnUu6MuFyX9CWrs8kucMw"
};

const HELIUS_API_KEY = "4f5e9d85-690a-4420-899d-4d9d5cac9171";

async function pollWallets() {
  const walletList = Object.entries(trackedWallets);
  for (const [label, wallet] of walletList) {
    try {
      const url = `https://api.helius.xyz/v0/addresses/${wallet}/transactions?api-key=${HELIUS_API_KEY}&limit=1`;
      const res = await fetch(url);
      const txs = await res.json();
      const recent = txs[0];

      if (recent && recent.type === "TRANSFER" && recent.tokenTransfers?.length > 0) {
        const firstToken = recent.tokenTransfers[0].mint;
        document.getElementById("wallet-feed").innerText = `🧠 ${label} just bought: ${firstToken.slice(0, 8)}...`;
        autoEvaluateToken(firstToken);
      }
    } catch (err) {
      console.warn("Polling error:", err);
    }
  }
}
setInterval(pollWallets, 30000);