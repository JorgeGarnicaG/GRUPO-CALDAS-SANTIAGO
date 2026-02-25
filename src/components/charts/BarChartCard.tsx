import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  xKey: string;
  dataKey: string;
}

export function BarChartCard({
  title,
  subtitle,
  data,
  xKey,
  dataKey
}: BarChartCardProps) {
  return (
    <section className="flex flex-col rounded-xl border border-slate-800/70 bg-card/80 p-4 shadow-card">
      <div className="mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
        )}
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <Bar
              dataKey={dataKey}
              fill="#5C7CFA"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

