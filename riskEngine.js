function evaluateRisk(token) {
  const bonding = token.bonding;
  const devHold = token.devHold;
  const liquidity = token.liquidity;
  const smartWallets = token.smartWallets;

  const issues = [];
  if (bonding > 85) issues.push("High Bonding %");
  if (devHold > 12) issues.push("Dev holds >12%");
  if (liquidity < 5) issues.push("Low Liquidity");
  if (smartWallets < 2) issues.push("Low Smart Wallet Interest");

  return {
    score: 100 - (issues.length * 20),
    warnings: issues,
    status: issues.length === 0 ? "green" : (issues.length >= 3 ? "red" : "yellow")
  };
}