import { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  trend?: string;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantClasses: Record<
  NonNullable<KpiCardProps["variant"]>,
  string
> = {
  default:
    "border-slate-800/70 bg-gradient-to-br from-card to-slate-950/90",
  success:
    "border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-card",
  warning:
    "border-amber-400/40 bg-gradient-to-br from-amber-400/20 to-card",
  danger:
    "border-rose-500/40 bg-gradient-to-br from-rose-500/20 to-card"
};

export function KpiCard({
  label,
  value,
  helper,
  trend,
  icon,
  variant = "default"
}: KpiCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border px-4 py-3 text-xs shadow-card ${variantClasses[variant]}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>
        {icon && <div className="text-slate-300">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-slate-50">{value}</p>
        {trend && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            {trend}
          </span>
        )}
      </div>
      {helper && (
        <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
      )}
    </div>
  );
}

