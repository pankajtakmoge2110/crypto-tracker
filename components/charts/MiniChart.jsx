import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function MiniChart({ data, positive }) {
  return (
    <ResponsiveContainer width={80} height={36}>
      <LineChart data={data.slice(-10)}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={positive ? "#22c55e" : "#ef4444"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}