"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Modal from "@/components/ui/Modal";
import { fmt } from "@/lib/helpers";

export default function PortfolioTab({ dark }) {
  const { assets, portfolio, setPortfolio } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ assetId: "bitcoin", qty: "", avgBuy: "" });
  const muted = dark ? "text-gray-400" : "text-gray-500";
  const card = dark ? "bg-[#111827] border-[#1e2a3a]" : "bg-white border-gray-200";
  const inputBg = dark ? "bg-[#0d1424] border-[#1e2a3a] text-white placeholder-gray-600" : "bg-gray-100 border-gray-300 text-gray-900";
  const selectBg = dark ? "bg-[#111827] border-[#1e2a3a] text-white" : "bg-white border-gray-300 text-gray-900";

  const data = portfolio.map(p => {
    const asset = assets.find(a => a.id === p.id);
    if (!asset) return null;
    const value = asset.price * p.qty;
    const cost = p.avgBuy * p.qty;
    const pnl = value - cost;
    const pnlPct = ((pnl / cost) * 100).toFixed(2);
    return { ...p, asset, value, cost, pnl, pnlPct };
  }).filter(Boolean);

  const totalValue = data.reduce((s, p) => s + p.value, 0);
  const totalCost = data.reduce((s, p) => s + p.cost, 0);
  const totalPnl = totalValue - totalCost;

  const handleAdd = () => {
    if (!form.qty || !form.avgBuy) return;
    const exists = portfolio.find(p => p.id === form.assetId);
    if (exists) {
      setPortfolio(prev => prev.map(p => p.id === form.assetId
        ? { ...p, qty: parseFloat(form.qty), avgBuy: parseFloat(form.avgBuy) } : p));
    } else {
      setPortfolio(prev => [...prev, { id: form.assetId, qty: parseFloat(form.qty), avgBuy: parseFloat(form.avgBuy) }]);
    }
    setShowModal(false);
    setForm({ assetId: "bitcoin", qty: "", avgBuy: "" });
  };

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Value", val: `$${totalValue.toFixed(2)}`, color: "" },
          { label: "Total P&L", val: `${totalPnl >= 0 ? "+" : ""}$${Math.abs(totalPnl).toFixed(2)}`, color: totalPnl >= 0 ? "text-green-400" : "text-red-400" },
          { label: "Total Cost", val: `$${totalCost.toFixed(2)}`, color: "" },
        ].map(s => (
          <div key={s.label} className={`${card} border rounded-2xl p-5`}>
            <div className={`text-xs ${muted} mb-1`}>{s.label}</div>
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Holdings</h2>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7c6fff] text-white text-sm font-medium hover:bg-[#6b5fff] transition-all">
          <Plus size={14} /> Add Position
        </button>
      </div>

      <div className={`${card} border rounded-2xl overflow-hidden`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-xs ${muted} border-b ${dark ? "border-[#1e2a3a]" : "border-gray-200"}`}>
              {["Asset", "Qty", "Avg Buy", "Current", "Value", "P&L", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(p => (
              <tr key={p.id} className={`border-b ${dark ? "border-[#1e2a3a] hover:bg-[#1a2332]" : "border-gray-100 hover:bg-gray-50"} transition-all`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${p.asset.type === "crypto" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {p.asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{p.asset.symbol}</div>
                      <div className={`text-xs ${muted}`}>{p.asset.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-mono">{p.qty}</td>
                <td className="px-4 py-4 font-mono">${fmt(p.avgBuy)}</td>
                <td className="px-4 py-4 font-mono">${fmt(p.asset.price)}</td>
                <td className="px-4 py-4 font-mono font-semibold">${p.value.toFixed(2)}</td>
                <td className={`px-4 py-4 font-bold ${p.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {p.pnl >= 0 ? "+" : ""}${Math.abs(p.pnl).toFixed(2)}
                  <div className="text-xs">{p.pnl >= 0 ? "+" : ""}{p.pnlPct}%</div>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => setPortfolio(prev => prev.filter(x => x.id !== p.id))}
                    className={`p-1.5 rounded-lg ${muted} hover:text-red-400 hover:bg-red-400/10 transition-all`}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal dark={dark} title="Add Position" onClose={() => setShowModal(false)}>
          <div className="space-y-3">
            <select value={form.assetId} onChange={e => setForm(f => ({ ...f, assetId: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${selectBg} text-sm outline-none`}>
              {assets.map(a => <option key={a.id} value={a.id}>{a.symbol} — {a.name}</option>)}
            </select>
            <input type="number" placeholder="Quantity" value={form.qty}
              onChange={e => setForm(f => ({ ...f, qty: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${inputBg} text-sm outline-none`} />
            <input type="number" placeholder="Avg Buy Price ($)" value={form.avgBuy}
              onChange={e => setForm(f => ({ ...f, avgBuy: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${inputBg} text-sm outline-none`} />
            <button onClick={handleAdd}
              className="w-full py-2.5 rounded-xl bg-[#7c6fff] text-white font-medium hover:bg-[#6b5fff] transition-all">
              Add to Portfolio
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}