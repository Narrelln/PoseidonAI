const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Add CORS support here
const cors = require('cors');
app.use(cors());

// Parse incoming JSON
app.use(express.json());

const API_KEY = 'KvBxLeZcVkSsYtvNJu';
const API_SECRET = 'xW9te7WrTaQTY0NELszQufJDl7Dobr6SuCbx';

function generateSignature(timestamp, body) {
  const payload = timestamp + API_KEY + body;
  return crypto.createHmac('sha256', API_SECRET).update(payload).digest('hex');
}

app.post('/place-order', async (req, res) => {
  const { symbol, side, qty } = req.body;
  const timestamp = Date.now().toString();

  const body = JSON.stringify({
    category: "linear",
    symbol: symbol,
    side: side,
    orderType: "Market",
    qty: qty.toString(),
    timeInForce: "GoodTillCancel"
  });

  const sign = generateSignature(timestamp, body);

  try {
    const response = await axios.post(
      "https://api-testnet.bybit.com/v5/order/create",
      JSON.parse(body),
      {
        headers: {
          "X-BAPI-API-KEY": API_KEY,
          "X-BAPI-SIGN": sign,
          "X-BAPI-TIMESTAMP": timestamp,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Trade Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy running on http://localhost:${PORT}`));
