import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, dark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-3 py-2 rounded-lg text-xs font-mono shadow-xl border
      ${dark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
      <div className="text-gray-400">{payload[0]?.payload?.time}</div>
      <div className="font-bold">${payload[0]?.value?.toFixed(2)}</div>
    </div>
  );
};

export default function PriceChart({ data, positive, dark }) {
  const color = positive ? "#22c55e" : "#ef4444";
  const gridColor = dark ? "#1e2a3a" : "#e5e7eb";
  const axisColor = dark ? "#374151" : "#9ca3af";

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="time" stroke={axisColor} tick={{ fontSize: 10 }} interval={5} />
        <YAxis stroke={axisColor} tick={{ fontSize: 10 }}
          tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`} width={60} />
        <Tooltip content={<CustomTooltip dark={dark} />} />
        <Area type="monotone" dataKey="price" stroke={color}
          fill="url(#chartGrad)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}