# Poseidon Auto-Evaluation Engine

This module connects the wallet tracker → Birdeye API → full Poseidon logic engine:
- Pulls token info from Birdeye
- Feeds Risk Engine, Momentum Tracker, Execution Logic
- Displays results in dashboard panel

Function to call:
```js
autoEvaluateToken("TOKEN_MINT_ADDRESS");
```