"use client";
import { BarChart2, Sun, Moon } from "lucide-react";

export default function Header({ tab, setTab, dark, setDark, tabs }) {
  const muted = dark ? "text-gray-400" : "text-gray-500";

  return (
    <header className={`sticky top-0 z-40 border-b ${dark ? "border-[#1e2a3a] bg-[#0a0e1a]/90" : "border-gray-200 bg-[#f0f4ff]/90"} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c6fff] to-[#5b4fff] flex items-center justify-center shadow-lg shadow-[#7c6fff]/30">
            <BarChart2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">TrackPulse</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c6fff]/10 border border-[#7c6fff]/30 text-[#7c6fff] font-medium">
            LIVE
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                ${tab === t ? "bg-[#7c6fff] text-white shadow-lg shadow-[#7c6fff]/20" : `${muted} hover:text-white`}`}>
              {t}
            </button>
          ))}
        </nav>

        {/* Theme toggle */}
        <button onClick={() => setDark(!dark)}
          className={`p-2 rounded-lg transition-all ${dark ? "bg-[#1e2a3a] text-yellow-400" : "bg-gray-200 text-gray-600"}`}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all
              ${tab === t ? "bg-[#7c6fff] text-white" : muted}`}>
            {t}
          </button>
        ))}
      </div>
    </header>
  );
}