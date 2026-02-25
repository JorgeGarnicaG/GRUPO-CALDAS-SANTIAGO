import { CxcRow, CxpRow, AgingBucket } from "./types";

function getAgingBucket(days: number | null | undefined): AgingBucket {
  const d = days ?? 0;
  if (d <= 30) return "0-30";
  if (d <= 60) return "31-60";
  if (d <= 90) return "61-90";
  return "90+";
}

export function computeDerivedForCxc(row: CxcRow, today: Date): CxcRow {
  const dueDate = row.fechven ? new Date(row.fechven) : null;
  let diasMora = 0;
  if (dueDate && !Number.isNaN(dueDate.getTime())) {
    const diffMs = today.getTime() - dueDate.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    diasMora = Math.max(0, diffDays);
  }
  const valorfact = row.valorfact ?? 0;
  const abonos = row.abonos ?? 0;
  const saldo = valorfact - abonos;

  const withDerived: CxcRow = {
    ...row,
    saldo_cxc: saldo,
    dias_mora: diasMora,
    rango_mora: getAgingBucket(diasMora)
  };

  return withDerived;
}

export function computeDerivedForCxp(row: CxpRow, today: Date): CxpRow {
  const dueDate = row.fechven ? new Date(row.fechven) : null;
  let diasMora = 0;
  if (dueDate && !Number.isNaN(dueDate.getTime())) {
    const diffMs = today.getTime() - dueDate.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    diasMora = Math.max(0, diffDays);
  }

  const valorfact = row.valorfact ?? 0;
  const abonos = row.abonos ?? 0;
  const descuentos = row.descuentos ?? 0;
  const reteica = row.reteica_vlr ?? 0;
  const reteiva = row.reteiva_vlr ?? 0;
  const retecree = row.retecree_vlr ?? 0;
  const rtefte = row.rtefte ?? 0;
  const retencion = row.retencion ?? 0;

  const saldo =
    valorfact -
    abonos -
    descuentos -
    reteica -
    reteiva -
    retecree -
    rtefte -
    retencion;

  const withDerived: CxpRow = {
    ...row,
    saldo_cxp: saldo,
    dias_mora: diasMora,
    rango_mora: getAgingBucket(diasMora)
  };

  return withDerived;
}

export function kpiCxc(rows: CxcRow[]) {
  const totalFacturado = rows.reduce(
    (acc, r) => acc + (r.valorfact ?? 0),
    0
  );
  const totalAbonos = rows.reduce((acc, r) => acc + (r.abonos ?? 0), 0);
  const saldoTotal = rows.reduce(
    (acc, r) => acc + (r.saldo_cxc ?? 0),
    0
  );
  const vencido = rows.reduce(
    (acc, r) =>
      acc +
      ((r.saldo_cxc ?? 0) > 0 && (r.dias_mora ?? 0) > 0
        ? r.saldo_cxc ?? 0
        : 0),
    0
  );

  return { totalFacturado, totalAbonos, saldoTotal, vencido };
}

export function kpiCxp(rows: CxpRow[]) {
  const totalPorPagar = rows.reduce(
    (acc, r) => acc + (r.valorfact ?? 0),
    0
  );
  const abonos = rows.reduce((acc, r) => acc + (r.abonos ?? 0), 0);
  const saldoNeto = rows.reduce(
    (acc, r) => acc + (r.saldo_cxp ?? 0),
    0
  );
  const vencido = rows.reduce(
    (acc, r) =>
      acc +
      ((r.saldo_cxp ?? 0) > 0 && (r.dias_mora ?? 0) > 0
        ? r.saldo_cxp ?? 0
        : 0),
    0
  );

  return { totalPorPagar, abonos, saldoNeto, vencido };
}

export function kpiCostos(rows: (CxcRow | CxpRow)[]) {
  const utilidadTotal = rows.reduce(
    (acc, r: any) => acc + (r.utilidad ?? 0),
    0
  );
  const brutaTotal = rows.reduce(
    (acc, r: any) => acc + (r.bruta ?? r.valorfact ?? 0),
    0
  );
  const comisiones = rows.reduce(
    (acc, r: any) => acc + (r.comision ?? 0),
    0
  );
  const otros = rows.reduce(
    (acc, r: any) => acc + (r.otros ?? 0),
    0
  );
  const margen = brutaTotal > 0 ? (utilidadTotal / brutaTotal) * 100 : 0;

  return { utilidadTotal, margen, comisiones, otros };
}

export function groupBy<T>(
  rows: T[],
  key: (row: T) => string
): Record<string, T[]> {
  return rows.reduce<Record<string, T[]>>((acc, row) => {
    const k = key(row);
    if (!acc[k]) acc[k] = [];
    acc[k].push(row);
    return acc;
  }, {});
}

