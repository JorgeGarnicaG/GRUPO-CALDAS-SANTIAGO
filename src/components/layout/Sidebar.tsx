"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/cxc", label: "Cuentas por Cobrar" },
  { href: "/dashboard/cxp", label: "Cuentas por Pagar" },
  { href: "/dashboard/produccion", label: "Producción" },
  { href: "/dashboard/costos", label: "Costos y Rentabilidad" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen flex-col bg-sidebar px-4 py-6 shadow-xl shadow-slate-950/70">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-xs font-semibold tracking-tight text-white">
          GC
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-slate-50">
            Grupo Caldas
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Panel de aceites
          </span>
        </div>
      </div>

      <nav className="space-y-1 text-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-accent/90 text-white shadow-card"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              )}
            >
              <span>{item.label}</span>
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 text-[11px] text-slate-500">
        <p className="font-medium">Operación de aceites</p>
        <p className="text-slate-600">Datos internos confidenciales</p>
      </div>
    </aside>
  );
}

