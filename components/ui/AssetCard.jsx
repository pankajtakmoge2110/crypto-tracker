import { Star } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { fmt, pct } from "@/lib/helpers";

export default function AssetCard({ asset, dark, onRemove, onClick }) {
  const color = asset.change >= 0 ? "#22c55e" : "#ef4444";

  return (
    <div onClick={onClick}
      className={`border rounded-2xl p-5 cursor-pointer transition-all
        ${dark ? "bg-[#111827] border-[#1e2a3a] hover:bg-[#1a2332]" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${asset.type === "crypto" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-bold">{asset.symbol}</div>
            <div className="text-xs text-gray-400">{asset.name}</div>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onRemove(asset.id); }}
          className="text-yellow-400 hover:text-yellow-300 p-1">
          <Star size={16} fill="currentColor" />
        </button>
      </div>

      <div className="font-bold text-2xl font-mono mb-1">${fmt(asset.price)}</div>
      <div className={`text-sm font-semibold ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
        {pct(asset.change)}
      </div>

      <div className="mt-3">
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={asset.chart.slice(-15)}>
            <defs>
              <linearGradient id={`cg-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="price" stroke={color}
              fill={`url(#cg-${asset.id})`} strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}