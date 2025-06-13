async function loadConvergence() {
  const res = await fetch("convergence.json");
  const data = await res.json();

  const grouped = {};
  data.forEach(entry => {
    if (!grouped[entry.token]) grouped[entry.token] = [];
    grouped[entry.token].push({ wallet: entry.wallet, time: entry.time });
  });

  const container = document.getElementById("convergence-panel");

  for (const token in grouped) {
    const events = grouped[token];
    const wallets = new Set();
    const baseTime = parseInt(events[0].time.split(":")[1]);

    events.forEach(e => {
      const min = parseInt(e.time.split(":")[1]);
      if (min - baseTime <= 5) wallets.add(e.wallet);
    });

    const converging = wallets.size >= 3;
    const div = document.createElement("div");
    div.className = "convergence-row";
    div.innerHTML = `
      <div><strong>${token}</strong></div>
      <div>Wallets: ${wallets.size}</div>
      <div><span class="dot ${converging ? 'green' : 'white'}"></span> ${converging ? 'Converging' : 'Not Enough Activity'}</div>
    `;
    container.appendChild(div);
  }
}
document.addEventListener("DOMContentLoaded", loadConvergence);
