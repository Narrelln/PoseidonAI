// positionSizer.js
function calculatePositionSize(confidence) {
  const min = 0.01;
  const max = 1.0;
  return (confidence / 100) * (max - min) + min;
}

module.exports = { calculatePositionSize };