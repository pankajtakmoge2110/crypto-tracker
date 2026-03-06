"use client";
import { createContext, useContext, useState } from "react";
import { INITIAL_ASSETS } from "@/lib/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [watchlist, setWatchlist] = useState(["bitcoin", "nvda"]);
  const [portfolio, setPortfolio] = useState([
    { id: "bitcoin", qty: 0.5, avgBuy: 61000 },
    { id: "nvda", qty: 10, avgBuy: 820 },
  ]);
  const [alerts, setAlerts] = useState([
    { id: 1, assetId: "bitcoin", condition: "above", price: 70000, triggered: false },
  ]);

  const toggleWatch = (id) =>
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <AppContext.Provider value={{ assets, setAssets, watchlist, toggleWatch, portfolio, setPortfolio, alerts, setAlerts }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);