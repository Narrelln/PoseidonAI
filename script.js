async function loadTradeOutput() {
  const res = await fetch('trade-scan.json');
  const data = await res.json();
  const output = document.getElementById('trade-output');
  output.innerHTML = '';
  for (const [symbol, trade] of Object.entries(data)) {
    output.innerHTML += `<p>[${trade.timestamp}] ${symbol} → ${trade.direction} @ ${trade.size} (Confidence: ${trade.confidence}%)</p>`;
  }
}
loadTradeOutput();
setInterval(loadTradeOutput, 3000);