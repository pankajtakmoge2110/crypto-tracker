"use client";
import { Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import AssetCard from "@/components/ui/AssetCard";

export default function WatchlistTab({ dark }) {
  const { assets, watchlist, toggleWatch } = useApp();
  const watched = assets.filter(a => watchlist.includes(a.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Watchlist</h2>
        <span className={dark ? "text-sm text-gray-400" : "text-sm text-gray-500"}>
          {watched.length} assets
        </span>
      </div>

      {watched.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center
          ${dark ? "bg-[#111827] border-[#1e2a3a] text-gray-400" : "bg-white border-gray-200 text-gray-500"}`}>
          <Star size={32} className="mx-auto mb-3 opacity-30" />
          <p>No assets in watchlist. Star assets from the Market tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watched.map(a => (
            <AssetCard key={a.id} asset={a} dark={dark} onRemove={toggleWatch} />
          ))}
        </div>
      )}
    </div>
  );
}