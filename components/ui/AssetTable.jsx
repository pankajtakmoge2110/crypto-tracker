import { ChevronUp, ChevronDown, Star } from "lucide-react";
import MiniChart from "@/components/charts/MiniChart";
import { fmt } from "@/lib/helpers";

export default function AssetTable({ assets, selected, onSelect, watchlist, onToggleWatch, dark }) {
  const muted = dark ? "text-gray-400" : "text-gray-500";
  const cardHover = dark ? "hover:bg-[#1a2332]" : "hover:bg-gray-50";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className={`text-xs ${muted} border-b ${dark ? "border-[#1e2a3a]" : "border-gray-200"}`}>
            {["#", "Asset", "Price", "24h %", "Market Cap", "Volume", "Chart", ""].map(h => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((a, i) => (
            <tr key={a.id} onClick={() => onSelect(a)}
              className={`border-b ${dark ? "border-[#1e2a3a]" : "border-gray-100"} cursor-pointer transition-all
                ${selected?.id === a.id ? "bg-[#7c6fff]/5" : cardHover}`}>
              <td className={`px-4 py-3 ${muted} text-xs`}>{i + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${a.type === "crypto" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                    {a.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className={`text-xs ${muted}`}>{a.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-semibold font-mono">${fmt(a.price)}</td>
              <td className={`px-4 py-3 font-bold ${a.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                <span className="flex items-center gap-1">
                  {a.change >= 0 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {Math.abs(a.change).toFixed(2)}%
                </span>
              </td>
              <td className={`px-4 py-3 ${muted} font-mono`}>${a.mcap}</td>
              <td className={`px-4 py-3 ${muted} font-mono`}>${a.volume}</td>
              <td className="px-4 py-3">
                <MiniChart data={a.chart} positive={a.change >= 0} />
              </td>
              <td className="px-4 py-3">
                <button onClick={(e) => { e.stopPropagation(); onToggleWatch?.(a.id); }}
                  className="p-1.5 rounded-lg hover:bg-yellow-400/10 text-yellow-400 transition-all">
                  {watchlist.includes(a.id) ? <Star size={14} fill="currentColor" /> : <Star size={14} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}