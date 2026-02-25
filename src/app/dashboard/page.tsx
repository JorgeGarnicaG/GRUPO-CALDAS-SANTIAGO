"use client";

import { Header } from "@/components/layout/Header";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { KpiCard } from "@/components/kpi/KpiCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { DonutChartCard } from "@/components/charts/DonutChartCard";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import {
  overviewKpis,
  flujoCajaMensual,
  agingCxc,
  agingCxp,
  topClientesCxc,
  topProveedoresCxp,
  produccionMensual,
  facturasDemo,
  FacturaRow
} from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

export default function OverviewDashboardPage() {
  const [range, setRange] = useState<{ from: string | null; to: string | null }>(
    { from: null, to: null }
  );
  const [search, setSearch] = useState("");

  const filteredRows = facturasDemo.filter((row) => {
    if (search) {
      const haystack = `${row.numero} ${row.tercero} ${row.ciudad} ${row.grupo}`.toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    // Rango de fechas básico sobre fechaFactura
    if (range.from && row.fechaFactura < range.from) return false;
    if (range.to && row.fechaFactura > range.to) return false;
    return true;
  });

  const columns: ColumnDef<FacturaRow>[] = [
    { key: "tipo", header: "Tipo" },
    { key: "numero", header: "Factura" },
    { key: "tercero", header: "Cliente / Proveedor", width: "min-w-[140px]" },
    { key: "grupo", header: "Grupo" },
    { key: "ciudad", header: "Ciudad" },
    { key: "fechaFactura", header: "Fecha fac." },
    { key: "fechaVencimiento", header: "Vence" },
    { key: "diasMora", header: "Días mora", align: "right" },
    {
      key: "valor",
      header: "Valor",
      align: "right",
      render: (r) => formatCurrency(r.valor)
    },
    {
      key: "saldo",
      header: "Saldo",
      align: "right",
      render: (r) => formatCurrency(r.saldo)
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Resumen ejecutivo"
        subtitle="Visión consolidada de cartera, pagos, producción y rentabilidad."
        rightContent={
          <DateRangeFilter
            from={range.from}
            to={range.to}
            onChange={setRange}
            search={search}
            onSearchChange={setSearch}
          />
        }
      />

      <section className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
        <KpiCard
          label="Saldo CxC"
          value={formatCurrency(overviewKpis.saldoCxc)}
        />
        <KpiCard
          label="Saldo CxP"
          value={formatCurrency(overviewKpis.saldoCxp)}
          tone="warning"
        />
        <KpiCard
          label="Utilidad periodo"
          value={formatCurrency(overviewKpis.utilidad)}
          tone="success"
        />
        <KpiCard
          label="Margen periodo"
          value={`${overviewKpis.margen.toFixed(1)}%`}
        />
        <KpiCard
          label="Producción total (ton)"
          value={overviewKpis.produccion.toString()}
        />
        <KpiCard
          label="Días promedio de cobro"
          value={overviewKpis.diasCobro.toString()}
        />
        <KpiCard
          label="Días promedio de pago"
          value={overviewKpis.diasPago.toString()}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <BarChartCard
          title="Flujo de caja esperado"
          subtitle="Entradas y salidas mensuales"
          data={flujoCajaMensual}
          xKey="periodo"
          bars={[
            { dataKey: "entradas", name: "Entradas", color: "#22C55E" },
            { dataKey: "salidas", name: "Salidas", color: "#EF4444" }
          ]}
        />
        <LineChartCard
          title="Producción vs facturación"
          subtitle="Comparación mensual"
          data={produccionMensual}
          xKey="periodo"
          lines={[
            {
              dataKey: "produccion",
              name: "Producción (ton)",
              color: "#5C7CFA"
            },
            {
              dataKey: "facturacion",
              name: "Facturación",
              color: "#22C55E"
            }
          ]}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <BarChartCard
          title="Aging CxC"
          subtitle="Saldo por rango de mora"
          data={agingCxc}
          xKey="rango"
          bars={[{ dataKey: "monto", name: "Saldo", color: "#F97316" }]}
        />
        <BarChartCard
          title="Aging CxP"
          subtitle="Obligaciones por rango de mora"
          data={agingCxp}
          xKey="rango"
          bars={[{ dataKey: "monto", name: "Saldo", color: "#E11D48" }]}
        />
        <DonutChartCard
          title="Top clientes y proveedores"
          subtitle="Participación en saldo"
          data={[...topClientesCxc, ...topProveedoresCxp]}
        />
      </section>

      <section className="mt-2">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Facturas relevantes
        </h2>
        <DataTable
          columns={columns}
          data={filteredRows}
          getRowId={(row) => row.numero}
        />
      </section>
    </div>
  );
}

