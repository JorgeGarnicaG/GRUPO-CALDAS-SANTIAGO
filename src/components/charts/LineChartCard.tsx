import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  dataKey: string;
  xKey: string;
}

export function LineChartCard({
  title,
  subtitle,
  data,
  dataKey,
  xKey
}: LineChartCardProps) {
  return (
    <section className="flex flex-col rounded-xl border border-slate-800/70 bg-card/80 p-4 shadow-card">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2933"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderColor: "#1E293B",
                borderRadius: 12,
                fontSize: 11
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#5C7CFA"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

