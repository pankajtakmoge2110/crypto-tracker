"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import MarketTab from "@/components/tabs/MarketTab";
import WatchlistTab from "@/components/tabs/WatchlistTab";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import AlertTab from "@/components/tabs/AlertTab";

const TABS = ["Market", "Watchlist", "Portfolio", "Alerts"];

export default function Page() {
  const [tab, setTab] = useState("Market");
  const [dark, setDark] = useState(false); // ← set false for light mode default

  return (
    <div className={`min-h-screen ${ dark ? "bg-[#0a0e1a] text-white" : "bg-[#f0f4ff] text-gray-900"}`}>
      <Header tab={tab} setTab={setTab} dark={dark} setDark={setDark} tabs={TABS} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab === "Market"    && <MarketTab dark={dark} />}
        {tab === "Watchlist" && <WatchlistTab dark={dark} />}
        {tab === "Portfolio" && <PortfolioTab dark={dark} />}
        {tab === "Alerts"    && <AlertTab dark={dark} />}
      </main>
    </div>
  );
}