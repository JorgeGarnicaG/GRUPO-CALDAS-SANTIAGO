export function formatCurrency(value: number): string {
  if (Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value: number): string {
  if (Number.isNaN(value)) return "—";
  return `${value.toFixed(1)}%`;
}

