const coins = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT'];
const coinData = {};

function updateDashboard() {
  const container = document.getElementById('coins');
  container.innerHTML = '';
  coins.forEach(symbol => {
    const info = coinData[symbol] || { direction: 'N/A', qty: 'N/A', confidence: 'N/A' };
    container.innerHTML += `
      <div class="coin-box">
        <strong>${symbol}</strong><br>
        Direction: ${info.direction}<br>
        Qty: ${info.qty}<br>
        Confidence: ${info.confidence}%
      </div>`;
  });
}

async function runTradeScan() {
  const res = await fetch('trade-scan.json');
  const data = await res.json();
  data.forEach(item => {
    coinData[item.symbol] = {
      direction: item.direction,
      qty: item.qty,
      confidence: item.confidence
    };
  });
  updateDashboard();
}

async function toggleLogs() {
  const logBox = document.getElementById('logBox');
  if (logBox.style.display === 'block') {
    logBox.style.display = 'none';
    return;
  }
  const res = await fetch('trade-decisions.log');
  const text = await res.text();
  logBox.textContent = text;
  logBox.style.display = 'block';
}

// Auto-refresh every 3 minutes
setInterval(runTradeScan, 180000);
runTradeScan();