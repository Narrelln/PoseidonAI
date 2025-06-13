const BIRDEYE_API_KEY = "cfcc5485796a4e85ac0444fac13dd9a2";

async function autoEvaluateToken(mintAddress) {
  const feed = document.getElementById("wallet-feed");
  try {
    const birdeyeURL = `https://public-api.birdeye.so/public/token/price?address=${mintAddress}&api_key=${BIRDEYE_API_KEY}`;
    const birdeyeRes = await fetch(birdeyeURL);
    const birdeyeData = await birdeyeRes.json();

    if (birdeyeData.data) {
      const parsed = birdeyeData.data;
      const token = {
        name: mintAddress,
        mc: parsed.marketCap || 0,
        bonding: 0,
        volume: parsed.volume24h || 0,
        liquidity: parsed.liquidity || 0,
        devHold: 0,
        smartWallets: 3,
        devBuy: true
      };
      updateMomentum(token);
      evaluateExecution(token);
      feed.innerText += `\n📊 [Birdeye] ${mintAddress}
- Market Cap: $${token.mc}
- Volume: $${token.volume}
- Liquidity: $${token.liquidity}
-------------------`;
      return;
    }

    // fallback to Jupiter
    const jupiterURL = `https://quote-api.jup.ag/v6/token-info?mint=${mintAddress}`;
    const jupRes = await fetch(jupiterURL);
    const jupData = await jupRes.json();

    if (jupData && jupData.symbol) {
      const token = {
        name: jupData.symbol,
        mc: 0,
        bonding: 0,
        volume: jupData.dayVolume || 0,
        liquidity: jupData.liquidity || 0,
        devHold: 0,
        smartWallets: 1,
        devBuy: false
      };
      updateMomentum(token);
      evaluateExecution(token);
      feed.innerText += `\n🪐 [Jupiter] ${token.name}
- Volume: $${token.volume}
- Liquidity: $${token.liquidity}
⚠️ Unlisted on Birdeye — early token or no DEX pool
-------------------`;
    } else {
      throw new Error("Not found on Jupiter either.");
    }
  } catch (e) {
    feed.innerText += `\n🚫 Token ${mintAddress} not found on Birdeye or Jupiter.`;
    console.warn(e);
    updateMomentum({ bonding: 0, volume: 0, liquidity: 0 });
    evaluateExecution({ mc: 0 });
  }
}