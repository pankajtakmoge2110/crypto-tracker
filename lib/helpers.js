export const fmt = (n) =>
  n >= 1000 ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  : n < 1 ? n.toFixed(4) : n.toFixed(2);

export const pct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;