// monitor.js
const mockTrades = [
    { pair: "BTC/USDT", price: 67200, change: "+1.5%" },
    { pair: "ETH/USDT", price: 3620, change: "-0.8%" },
    { pair: "SOL/USDT", price: 145, change: "+2.3%" }
  ];
  
  function updateTradeTable() {
    const tableBody = document.getElementById("trade-table-body");
    tableBody.innerHTML = ""; // Clear old data
  
    mockTrades.forEach(trade => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trade.pair}</td>
        <td>${trade.price}</td>
        <td class="${trade.change.startsWith('+') ? 'positive' : 'negative'}">
          ${trade.change}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Simulate update every 5 seconds
  setInterval(updateTradeTable, 5000);
  window.onload = updateTradeTable;