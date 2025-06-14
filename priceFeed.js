// priceFeed.js
const axios = require('axios');

async function fetchPrice(symbol) {
  const response = await axios.get(`https://api-testnet.bybit.com/v2/public/tickers?symbol=${symbol}`);
  return parseFloat(response.data.result[0].last_price);
}

module.exports = { fetchPrice };