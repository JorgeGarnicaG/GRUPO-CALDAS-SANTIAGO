interface DateRangeFilterProps {
  from: string | null;
  to: string | null;
  onChange: (range: { from: string | null; to: string | null }) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function DateRangeFilter({
  from,
  to,
  onChange,
  search,
  onSearchChange
}: DateRangeFilterProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 text-xs">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Desde
        </label>
        <input
          type="date"
          value={from ?? ""}
          onChange={(e) =>
            onChange({ from: e.target.value || null, to })
          }
          className="h-8 rounded-lg border border-slate-700/80 bg-slate-950/60 px-2 text-xs text-slate-100 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Hasta
        </label>
        <input
          type="date"
          value={to ?? ""}
          onChange={(e) =>
            onChange({ from, to: e.target.value || null })
          }
          className="h-8 rounded-lg border border-slate-700/80 bg-slate-950/60 px-2 text-xs text-slate-100 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-[180px]">
        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Buscar
        </label>
        <input
          type="search"
          placeholder="Cliente, proveedor, factura…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 rounded-lg border border-slate-700/80 bg-slate-950/60 px-2 text-xs text-slate-100 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
    </div>
  );
}

