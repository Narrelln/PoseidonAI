async function autoEvaluateToken(mint) {
  const resultBox = document.getElementById("execution-result");
  let marketCap = 0;
  let volume = 0;

  try {
    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=10000000&slippage=1`
    );
    const data = await response.json();

    if (data.data && data.data[0]) {
      volume = data.data[0].outAmount || 0;
      marketCap = 15000; // Simulated market cap
    }

    if (marketCap < 100000 && volume > 5000) {
      resultBox.textContent = `[✓] Entry Viable\nMarket Cap: $${marketCap}\nVolume: $${volume}`;
      autoTradeToken(mint, marketCap, volume);
    } else {
      resultBox.textContent = `[X] Entry Rejected\nMarket Cap: $${marketCap}\nVolume: $${volume}`;
    }
  } catch (err) {
    console.error("Evaluation error:", err);
    resultBox.textContent = "[X] Jupiter evaluation failed.";
  }
}