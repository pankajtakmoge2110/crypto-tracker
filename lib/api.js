const COINGECKO = "https://api.coingecko.com/api/v3";
const AV_KEY = process.env.NEXT_PUBLIC_AV_KEY;

export async function getCryptoMarkets() {
  const res = await fetch(
    `${COINGECKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&sparkline=true`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export async function getStockQuote(symbol) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_KEY}`
  );
  const data = await res.json();
  const q = data["Global Quote"];
  return {
    symbol: q["01. symbol"],
    price: parseFloat(q["05. price"]),
    change: parseFloat(q["10. change percent"]),
  };
}