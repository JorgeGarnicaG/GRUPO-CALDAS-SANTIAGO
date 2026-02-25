interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneClasses: Record<
  NonNullable<KpiCardProps["tone"]>,
  string
> = {
  default:
    "border-slate-800/70 bg-gradient-to-br from-card to-slate-950/90",
  success:
    "border-emerald-500/40 bg-gradient-to-br from-emerald-500/25 to-card",
  warning:
    "border-amber-400/40 bg-gradient-to-br from-amber-400/25 to-card",
  danger:
    "border-rose-500/40 bg-gradient-to-br from-rose-500/25 to-card"
};

export function KpiCard({
  label,
  value,
  helper,
  tone = "default"
}: KpiCardProps) {
  return (
    <article
      className={`flex flex-col rounded-xl border px-4 py-3 text-xs shadow-card ${toneClasses[tone]}`}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-50">{value}</p>
      {helper && (
        <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
      )}
    </article>
  );
}

