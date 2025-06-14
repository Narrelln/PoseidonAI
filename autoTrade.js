// autoTrade.js
const axios = require('axios');
const { getTradeSignal } = require('./futuresDecision');
const { calculatePositionSize } = require('./positionSizer');
const fs = require('fs');

const coins = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT'];

async function runAutoTrades() {
  for (const symbol of coins) {
    const { direction, confidence, price } = await getTradeSignal(symbol);
    const qty = calculatePositionSize(confidence).toFixed(2);

    // Log decision
    const log = `${new Date().toISOString()} - ${symbol} → ${direction} at ${qty} (confidence: ${confidence}%)\n`;
    fs.appendFileSync('trade-decisions.log', log);

    // Send to trade proxy
    await axios.post('http://localhost:3000/place-order', {
      symbol,
      side: direction,
      qty
    }).catch(err => {
      fs.appendFileSync('trade-decisions.log', `Error trading ${symbol}: ${err.message}\n`);
    });
  }
}

runAutoTrades();