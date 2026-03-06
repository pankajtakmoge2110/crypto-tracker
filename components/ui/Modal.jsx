import { X } from "lucide-react";

export default function Modal({ dark, title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`border rounded-2xl p-6 w-full max-w-sm mx-4
        ${dark ? "bg-[#111827] border-[#1e2a3a] text-white" : "bg-white border-gray-200 text-gray-900"}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 transition-all">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}