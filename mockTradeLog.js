
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById("trade-output");
    const logs = [
        { time: "2025-06-14T12:33:00Z", pair: "BTCUSDT", side: "Buy", amount: "0.01", confidence: 92 },
        { time: "2025-06-14T12:34:00Z", pair: "ETHUSDT", side: "Sell", amount: "0.05", confidence: 88 }
    ];
    output.innerHTML = logs.map(log => {
        return `[${log.time}] ${log.pair} → ${log.side} @ ${log.amount} (Confidence: ${log.confidence}%)`;
    }).join("<br><br>");
});
