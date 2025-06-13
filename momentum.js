function updateMomentum(token) {
  const el = document.getElementById("momentum-output");
  el.innerText = `Bonding: ${token.bonding}%\nVolume: $${token.volume.toLocaleString()}\nLiquidity: $${token.liquidity.toLocaleString()}`;
}