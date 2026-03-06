const staticChart = (base, points = 30) => {
  const data = [];
  let val = base;
  for (let i = points; i >= 0; i--) {
    // Use a deterministic pattern instead of Math.random()
    val += (i % 2 === 0 ? 1 : -1) * base * 0.005;
    data.push({
      time: `${String(Math.floor(i / 2)).padStart(2, "0")}:00`,
      price: parseFloat(val.toFixed(2)),
    });
  }
  return data;
};

export const INITIAL_ASSETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", type: "crypto", price: 67420.50, change: 3.24, mcap: "1.32T", volume: "28.4B" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", type: "crypto", price: 3512.80, change: -1.87, mcap: "421B", volume: "14.2B" },
  { id: "solana", symbol: "SOL", name: "Solana", type: "crypto", price: 182.40, change: 5.61, mcap: "78.3B", volume: "4.1B" },
  { id: "bnb", symbol: "BNB", name: "BNB", type: "crypto", price: 598.20, change: 0.93, mcap: "89.2B", volume: "1.8B" },
  { id: "xrp", symbol: "XRP", name: "XRP", type: "crypto", price: 0.5842, change: -2.14, mcap: "32.1B", volume: "1.2B" },
  { id: "aapl", symbol: "AAPL", name: "Apple Inc.", type: "stock", price: 189.30, change: 1.42, mcap: "2.94T", volume: "58.3M" },
  { id: "tsla", symbol: "TSLA", name: "Tesla Inc.", type: "stock", price: 248.50, change: -3.71, mcap: "791B", volume: "102.4M" },
  { id: "nvda", symbol: "NVDA", name: "NVIDIA Corp.", type: "stock", price: 875.40, change: 6.22, mcap: "2.15T", volume: "41.2M" },
  { id: "msft", symbol: "MSFT", name: "Microsoft", type: "stock", price: 415.20, change: 0.84, mcap: "3.08T", volume: "22.1M" },
  { id: "amzn", symbol: "AMZN", name: "Amazon", type: "stock", price: 182.60, change: 2.15, mcap: "1.89T", volume: "35.6M" },
].map(a => ({ ...a, chart: staticChart(a.price) }));