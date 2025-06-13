
const TRADE_CRITERIA = {
  bondingThreshold: 60,
  volumeThreshold: 10000,
  mcMin: 7000,
  mcMax: 85000,
  smartWalletsRequired: 2
};

const TOKENS = [
  {
    name: "GLITCH",
    bonding: 72,
    volume: 12400,
    mc: 68000,
    smartWallets: 3
  },
  {
    name: "FLEXUS",
    bonding: 61,
    volume: 10200,
    mc: 79000,
    smartWallets: 3
  },
  {
    name: "ZORBO",
    bonding: 95,
    volume: 14500,
    mc: 86000,
    smartWallets: 4
  }
];

function getEntryMode(mc) {
  return mc < 10000 ? "Early Entry" : "Bonded Entry";
}

function isTradeViable(token) {
  return (
    token.bonding >= TRADE_CRITERIA.bondingThreshold &&
    token.volume >= TRADE_CRITERIA.volumeThreshold &&
    token.mc >= TRADE_CRITERIA.mcMin &&
    token.mc <= TRADE_CRITERIA.mcMax &&
    token.smartWallets >= TRADE_CRITERIA.smartWalletsRequired
  );
}

function displayTradeList() {
  const tradeList = document.getElementById("trade-list");
  tradeList.innerHTML = "";

  TOKENS.forEach(token => {
    if (isTradeViable(token)) {
      const row = document.createElement("div");
      row.className = "risk-row";
      row.innerHTML = `
        <div><strong>${token.name}</strong></div>
        <div>Bonding: ${token.bonding}%</div>
        <div>Vol: $${token.volume.toLocaleString()}</div>
        <div>MC: $${token.mc.toLocaleString()}</div>
        <div><span>${getEntryMode(token.mc)}</span> <button onclick="executeTrade('${token.name}')">Enter</button></div>
      `;
      tradeList.appendChild(row);
    }
  });
}

function executeTrade(tokenName) {
  const log = document.getElementById("executed-trades");
  const time = new Date().toLocaleTimeString();
  const item = document.createElement("div");
  item.innerHTML = `🟢 Executed ${tokenName} at ${time}`;
  log.prepend(item);
}

document.addEventListener("DOMContentLoaded", displayTradeList);
