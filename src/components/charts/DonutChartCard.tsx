import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

interface DonutChartCardProps {
  title: string;
  subtitle?: string;
  data: { name: string; value: number }[];
}

const palette = ["#5C7CFA", "#34D399", "#FBBF24", "#F97373", "#818CF8"];

export function DonutChartCard({
  title,
  subtitle,
  data
}: DonutChartCardProps) {
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={palette[index % palette.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderColor: "#1E293B",
                borderRadius: 12,
                fontSize: 11
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={32}
              iconSize={8}
              wrapperStyle={{
                fontSize: 10,
                color: "#9CA3AF"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

