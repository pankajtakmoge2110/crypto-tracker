"use client";
import { useState } from "react";
import { Bell, Plus, Trash2, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Modal from "@/components/ui/Modal";
import { fmt } from "@/lib/helpers";

export default function AlertTab({ dark }) {
  const { assets, alerts, setAlerts } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ assetId: "bitcoin", condition: "above", price: "" });
  const muted = dark ? "text-gray-400" : "text-gray-500";
  const card = dark ? "bg-[#111827] border-[#1e2a3a]" : "bg-white border-gray-200";
  const inputBg = dark ? "bg-[#0d1424] border-[#1e2a3a] text-white placeholder-gray-600" : "bg-gray-100 border-gray-300 text-gray-900";
  const selectBg = dark ? "bg-[#111827] border-[#1e2a3a] text-white" : "bg-white border-gray-300 text-gray-900";

  const handleAdd = () => {
    if (!form.price) return;
    setAlerts(prev => [...prev, { id: Date.now(), ...form, price: parseFloat(form.price), triggered: false }]);
    setShowModal(false);
    setForm({ assetId: "bitcoin", condition: "above", price: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Price Alerts</h2>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7c6fff] text-white text-sm font-medium hover:bg-[#6b5fff] transition-all">
          <Plus size={14} /> New Alert
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className={`${card} border rounded-2xl p-12 text-center ${muted}`}>
          <Bell size={32} className="mx-auto mb-3 opacity-30" />
          <p>No alerts set. Create one to get notified when prices move.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map(alert => {
            const asset = assets.find(a => a.id === alert.assetId);
            if (!asset) return null;
            const dist = Math.abs(((asset.price - alert.price) / alert.price) * 100).toFixed(1);
            return (
              <div key={alert.id} className={`${card} border rounded-2xl p-5 ${alert.triggered ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${alert.triggered ? "bg-green-500/20 text-green-400" : "bg-[#7c6fff]/20 text-[#7c6fff]"}`}>
                      {alert.triggered ? <CheckCircle size={18} /> : <Bell size={18} />}
                    </div>
                    <div>
                      <div className="font-bold">{asset.symbol}</div>
                      <div className={`text-xs ${muted}`}>{asset.name}</div>
                    </div>
                  </div>
                  <button onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                    className={`${muted} hover:text-red-400 p-1 transition-all`}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={muted}>Condition</span>
                    <span>Price {alert.condition} <span className="font-mono text-[#7c6fff]">${fmt(alert.price)}</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className={muted}>Current</span>
                    <span className="font-mono font-semibold">${fmt(asset.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={muted}>Distance</span>
                    <span className={parseFloat(dist) < 2 ? "text-orange-400 font-medium" : muted}>{dist}% away</span>
                  </div>
                  <div className={`mt-2 py-1.5 px-3 rounded-lg text-xs font-medium text-center
                    ${alert.triggered ? "bg-green-500/10 text-green-400" : "bg-[#7c6fff]/10 text-[#7c6fff]"}`}>
                    {alert.triggered ? "✓ Triggered" : "⏳ Watching..."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <Modal dark={dark} title="New Price Alert" onClose={() => setShowModal(false)}>
          <div className="space-y-3">
            <select value={form.assetId} onChange={e => setForm(f => ({ ...f, assetId: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${selectBg} text-sm outline-none`}>
              {assets.map(a => <option key={a.id} value={a.id}>{a.symbol} — {a.name}</option>)}
            </select>
            <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${selectBg} text-sm outline-none`}>
              <option value="above">Price goes above</option>
              <option value="below">Price drops below</option>
            </select>
            <input type="number" placeholder="Target price ($)" value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl border ${inputBg} text-sm outline-none`} />
            <button onClick={handleAdd}
              className="w-full py-2.5 rounded-xl bg-[#7c6fff] text-white font-medium hover:bg-[#6b5fff] transition-all">
              Create Alert
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}