
const axios = require('axios');
const crypto = require('crypto');

const API_KEY = 'KvBxLeZcVkSsYtvNJu';       // Replace with your real API key
const API_SECRET = 'xW9te7WrTaQTY0NELszQufJDl7Dobr6SuCbx'; // Replace with your real secret

const timestamp = Date.now().toString();
const query = 'accountType=UNIFIED';

const signature = crypto
  .createHmac('sha256', API_SECRET)
  .update(timestamp + API_KEY + query)
  .digest('hex');

axios.get('https://api-testnet.bybit.com/v5/account/wallet-balance?' + query, {
  headers: {
    'X-BAPI-API-KEY': API_KEY,
    'X-BAPI-SIGN': signature,
    'X-BAPI-TIMESTAMP': timestamp
  }
})
.then(response => {
  console.log('✅ API Key is valid:', response.data);
})
.catch(error => {
  console.error('❌ API Key verification failed:', error.response?.data || error.message);
});
