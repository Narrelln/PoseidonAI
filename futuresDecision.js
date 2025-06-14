// futuresDecision.js
const { fetchPrice } = require('./priceFeed');

async function getTradeSignal(symbol) {
  const price = await fetchPrice(symbol);
  const randomConfidence = Math.floor(Math.random() * 100) + 1;
  const direction = randomConfidence > 50 ? "Buy" : "Sell";
  return { symbol, direction, confidence: randomConfidence, price };
}

module.exports = { getTradeSignal };