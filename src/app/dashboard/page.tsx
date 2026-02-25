import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/kpi/KpiCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { DonutChartCard } from "@/components/charts/DonutChartCard";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CxcRow, CxpRow } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { kpiCxc, kpiCxp, kpiCostos, groupBy } from "@/lib/metrics";

interface SearchParams {
  from?: string;
  to?: string;
  q?: string;
}

function filterByDateAndSearch<T extends { fechfactol?: string | null; fecha?: string | null; nomcli?: string | null; nomgrupo?: string | null }>(
  rows: T[],
  { from, to, q }: SearchParams
): T[] {
  let result = rows;

  if (from) {
    const fromDate = new Date(from);
    result = result.filter((r) => {
      const raw = (r.fechfactol ?? r.fecha) as string | null;
      if (!raw) return true;
      const d = new Date(raw);
      return d >= fromDate;
    });
  }

  if (to) {
    const toDate = new Date(to);
    result = result.filter((r) => {
      const raw = (r.fechfactol ?? r.fecha) as string | null;
      if (!raw) return true;
      const d = new Date(raw);
      return d <= toDate;
    });
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter((r) => {
      const haystack = [
        r.nomcli ?? "",
        (r as any).codfactol ?? "",
        r.nomgrupo ?? ""
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  return result;
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const supabase = createServerSupabaseClient();

  const [{ data: cxc }, { data: cxp }] = await Promise.all([
    supabase.from("cxc_facturas").select("*").limit(5000),
    supabase.from("cxp_facturas").select("*").limit(5000)
  ]);

  const cxcRows = filterByDateAndSearch<CxcRow>(
    (cxc as CxcRow[]) ?? [],
    searchParams
  );
  const cxpRows = filterByDateAndSearch<CxpRow>(
    (cxp as CxpRow[]) ?? [],
    searchParams
  );

  const cxcKpi = kpiCxc(cxcRows);
  const cxpKpi = kpiCxp(cxpRows);
  const costosKpi = kpiCostos([
    ...(cxcRows as any[]),
    ...(cxpRows as any[])
  ]);

  const cxcByMonth = Object.entries(
    groupBy(cxcRows, (r) =>
      (r.fechfactol ?? r.fecha ?? "").slice(0, 7) || "Sin fecha"
    )
  ).map(([month, rows]) => ({
    month,
    saldo: rows.reduce((acc, r) => acc + (r.saldo_cxc ?? 0), 0)
  }));

  const agingCxc = Object.entries(
    groupBy(cxcRows, (r) => r.rango_mora ?? "0-30")
  ).map(([range, rows]) => ({
    range,
    saldo: rows.reduce((acc, r) => acc + (r.saldo_cxc ?? 0), 0)
  }));

  const topClientesCxc = Object.entries(
    groupBy(cxcRows, (r) => r.nomcli ?? "Sin cliente")
  )
    .map(([cliente, rows]) => ({
      cliente,
      saldo: rows.reduce((acc, r) => acc + (r.saldo_cxc ?? 0), 0)
    }))
    .sort((a, b) => b.saldo - a.saldo)
    .slice(0, 8);

  const agingCxp = Object.entries(
    groupBy(cxpRows, (r) => r.rango_mora ?? "0-30")
  ).map(([range, rows]) => ({
    range,
    saldo: rows.reduce((acc, r) => acc + (r.saldo_cxp ?? 0), 0)
  }));

  const topProveedores = Object.entries(
    groupBy(cxpRows, (r) => r.nomcli ?? "Sin proveedor")
  )
    .map(([proveedor, rows]) => ({
      proveedor,
      saldo: rows.reduce((acc, r) => acc + (r.saldo_cxp ?? 0), 0)
    }))
    .sort((a, b) => b.saldo - a.saldo)
    .slice(0, 8);

  const monthlyUtilidad = Object.entries(
    groupBy(
      [...cxcRows, ...cxpRows] as any[],
      (r: any) => (r.fechfactol ?? r.fecha ?? "").slice(0, 7) || "Sin fecha"
    )
  ).map(([month, rows]) => ({
    month,
    utilidad: rows.reduce((acc: number, r: any) => acc + (r.utilidad ?? 0), 0)
  }));

  const lastInvoices: (CxcRow | CxpRow)[] = [...cxcRows, ...cxpRows]
    .filter((r) => (r as any).fechfactol || (r as any).fecha)
    .sort((a: any, b: any) => {
      const da = new Date(a.fechfactol ?? a.fecha ?? 0).getTime();
      const db = new Date(b.fechfactol ?? b.fecha ?? 0).getTime();
      return db - da;
    })
    .slice(0, 30);

  const tableColumns: ColumnDef<CxcRow | CxpRow>[] = [
    {
      key: "fechfactol",
      header: "Fecha factura",
      render: (row) =>
        formatDate((row as any).fechfactol ?? (row as any).fecha)
    },
    {
      key: "codfactol",
      header: "Factura"
    },
    {
      key: "nomcli",
      header: "Cliente / proveedor",
      width: "min-w-[160px]"
    },
    {
      key: "nomgrupo",
      header: "Grupo",
      width: "min-w-[120px]"
    },
    {
      key: "valorfact",
      header: "Valor",
      align: "right",
      render: (row) => formatCurrency((row as any).valorfact ?? 0)
    },
    {
      key: "saldo",
      header: "Saldo",
      align: "right",
      render: (row) =>
        formatCurrency(
          (row as any).saldo_cxc ?? (row as any).saldo_cxp ?? 0
        )
    },
    {
      key: "dias_mora",
      header: "Días mora",
      align: "right"
    }
  ];

  const from = searchParams.from ?? null;
  const to = searchParams.to ?? null;
  const q = searchParams.q ?? "";

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Resumen general"
        subtitle="Visión consolidada de cuentas por cobrar, cuentas por pagar y rentabilidad."
        rightContent={
          <DateRangeFilter
            from={from}
            to={to}
            onChange={() => {
              /* handled by URL search params via client-side wrappers if needed */
            }}
            search={q}
            onSearchChange={() => {
              /* placeholder, real filtering se realiza por query params */
            }}
          />
        }
      />

      <section className="grid gap-3 md:grid-cols-4">
        <KpiCard
          label="CxC - Saldo total"
          value={formatCurrency(cxcKpi.saldoTotal)}
          helper={`Facturado: ${formatCurrency(
            cxcKpi.totalFacturado
          )} · Abonos: ${formatCurrency(cxcKpi.totalAbonos)}`}
        />
        <KpiCard
          label="CxC - Vencido"
          value={formatCurrency(cxcKpi.vencido)}
          variant="warning"
        />
        <KpiCard
          label="CxP - Saldo neto"
          value={formatCurrency(cxpKpi.saldoNeto)}
          helper={`Por pagar: ${formatCurrency(
            cxpKpi.totalPorPagar
          )} · Abonos: ${formatCurrency(cxpKpi.abonos)}`}
        />
        <KpiCard
          label="Utilidad total"
          value={formatCurrency(costosKpi.utilidadTotal)}
          helper={`Margen: ${costosKpi.margen.toFixed(1)}%`}
          variant="success"
        />
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <LineChartCard
          title="Evolución mensual CxC"
          subtitle="Saldo total por mes"
          data={cxcByMonth}
          xKey="month"
          dataKey="saldo"
        />
        <BarChartCard
          title="Aging CxC"
          subtitle="Saldo por rango de mora"
          data={agingCxc}
          xKey="range"
          dataKey="saldo"
        />
        <DonutChartCard
          title="Top clientes por saldo"
          subtitle="Ocho principales clientes"
          data={topClientesCxc.map((c) => ({
            name: c.cliente,
            value: c.saldo
          }))}
        />
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <BarChartCard
          title="Aging CxP"
          subtitle="Obligaciones por rango de mora"
          data={agingCxp}
          xKey="range"
          dataKey="saldo"
        />
        <DonutChartCard
          title="Top proveedores por saldo"
          subtitle="Ocho principales proveedores"
          data={topProveedores.map((p) => ({
            name: p.proveedor,
            value: p.saldo
          }))}
        />
      </section>

      <LineChartCard
        title="Utilidad por mes"
        subtitle="Acumulado de utilidad (CxC + CxP)"
        data={monthlyUtilidad}
        xKey="month"
        dataKey="utilidad"
      />

      <section className="mt-2">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Últimas facturas
        </h2>
        <DataTable
          columns={tableColumns}
          data={lastInvoices}
          getRowId={(_, index) => `fact-${index.toString()}`}
        />
      </section>
    </div>
  );
}

