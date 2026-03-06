"use client";
import { useState, useEffect } from "react";
import { Search, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import PriceChart from "@/components/charts/PriceChart";
import AssetTable from "@/components/ui/AssetTable";
import { fmt, pct } from "@/lib/helpers";

export default function MarketTab({ dark }) {
  const { assets, setAssets, watchlist, toggleWatch } = useApp();
  const [selected, setSelected] = useState(assets[0]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const muted = dark ? "text-gray-400" : "text-gray-500";
  const card = dark ? "bg-[#111827] border-[#1e2a3a]" : "bg-white border-gray-200";
  const inputBg = dark ? "bg-[#0d1424] border-[#1e2a3a] text-white placeholder-gray-600" : "bg-gray-100 border-gray-300 text-gray-900";

  // Sync selected with live prices
  useEffect(() => {
    setSelected(prev => assets.find(a => a.id === prev?.id) || assets[0]);
  }, [assets]);

  // Simulate live updates
  useEffect(() => {
  const interval = setInterval(() => {
    setAssets(prev => prev.map(a => {
      const delta = (Math.random() - 0.495) * a.price * 0.003;
      const newPrice = parseFloat((a.price + delta).toFixed(a.price < 1 ? 4 : 2));
      const newChart = [...a.chart.slice(1), {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: newPrice,
      }];
      return { ...a, price: newPrice, chart: newChart };
    }));
  }, 2000);
  return () => clearInterval(interval);
}, []); 

  const filtered = assets.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.symbol.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Market Cap", val: "$2.84T", sub: "+2.1% today" },
          { label: "24h Volume", val: "$98.6B", sub: "Crypto + Stocks" },
          { label: "BTC Dominance", val: "52.4%", sub: "↑ 0.8%" },
          { label: "Fear & Greed", val: "72", sub: "Greed" },
        ].map(s => (
          <div key={s.label} className={`${card} border rounded-xl p-4`}>
            <div className={`text-xs ${muted} mb-1`}>{s.label}</div>
            <div className="text-xl font-bold font-mono">{s.val}</div>
            <div className="text-xs text-green-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`${card} border rounded-2xl p-5 lg:col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold">{selected?.name}</div>
              <div className="font-mono text-3xl font-bold mt-1">${fmt(selected?.price ?? 0)}</div>
            </div>
            <div className={`text-lg font-bold ${selected?.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {pct(selected?.change ?? 0)}
            </div>
          </div>
          <PriceChart data={selected?.chart ?? []} positive={(selected?.change ?? 0) >= 0} dark={dark} />
        </div>

        <div className={`${card} border rounded-2xl p-4`}>
          <div className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-green-400" /> Top Movers
          </div>
          <div className="space-y-2">
            {[...assets].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 7).map(a => (
              <button key={a.id} onClick={() => setSelected(a)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all
                  ${selected?.id === a.id ? "bg-[#7c6fff]/10 border border-[#7c6fff]/30" : dark ? "hover:bg-[#1a2332]" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${a.type === "crypto" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                    {a.symbol.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{a.symbol}</div>
                    <div className={`text-[10px] ${muted}`}>${fmt(a.price)}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${a.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {pct(a.change)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`${card} border rounded-2xl overflow-hidden`}>
        <div className="p-4 border-b border-inherit flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <h2 className="font-bold text-lg">All Assets</h2>
          <div className="flex gap-2 flex-wrap">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${inputBg}`}>
              <Search size={14} className={muted} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search..." className="bg-transparent text-sm outline-none w-32" />
            </div>
            {["all", "crypto", "stock"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-sm capitalize font-medium border transition-all
                  ${filter === f ? "bg-[#7c6fff] text-white border-[#7c6fff]" : `${dark ? "border-[#1e2a3a]" : "border-gray-200"} ${muted}`}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <AssetTable
          assets={filtered}
          selected={selected}
          onSelect={setSelected}
          watchlist={watchlist}
          onToggleWatch={toggleWatch}
          dark={dark}
        />
      </div>
    </div>
  );
}