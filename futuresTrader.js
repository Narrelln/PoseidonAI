async function placeFuturesOrder(symbol, side, qty) {
  try {
    const res = await fetch("http://localhost:3000/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: symbol,
        side: side,
        qty: qty
      })
    });

    const data = await res.json();
    console.log("Trade Executed:", data);
    document.getElementById("execution-result").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("Trade Error:", err);
    document.getElementById("execution-result").innerText = "Trade Error: " + err.message;
  }
}