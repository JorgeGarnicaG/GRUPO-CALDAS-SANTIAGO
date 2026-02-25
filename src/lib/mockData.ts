// Datos de ejemplo estáticos para ilustrar el diseño del dashboard.

export const overviewKpis = {
  saldoCxc: 420_000_000,
  saldoCxp: 310_000_000,
  utilidad: 180_000_000,
  margen: 24.5,
  produccion: 1250,
  diasCobro: 48,
  diasPago: 32
};

export const flujoCajaMensual = [
  { periodo: "Ene", entradas: 120_000_000, salidas: 80_000_000 },
  { periodo: "Feb", entradas: 140_000_000, salidas: 95_000_000 },
  { periodo: "Mar", entradas: 160_000_000, salidas: 110_000_000 },
  { periodo: "Abr", entradas: 150_000_000, salidas: 100_000_000 }
];

export const agingCxc = [
  { rango: "0-30", monto: 160_000_000 },
  { rango: "31-60", monto: 120_000_000 },
  { rango: "61-90", monto: 80_000_000 },
  { rango: "90+", monto: 60_000_000 }
];

export const agingCxp = [
  { rango: "0-30", monto: 140_000_000 },
  { rango: "31-60", monto: 90_000_000 },
  { rango: "61-90", monto: 50_000_000 },
  { rango: "90+", monto: 30_000_000 }
];

export const topClientesCxc = [
  { name: "Cliente A", value: 90_000_000 },
  { name: "Cliente B", value: 70_000_000 },
  { name: "Cliente C", value: 55_000_000 },
  { name: "Cliente D", value: 40_000_000 }
];

export const topProveedoresCxp = [
  { name: "Proveedor X", value: 85_000_000 },
  { name: "Proveedor Y", value: 60_000_000 },
  { name: "Proveedor Z", value: 45_000_000 }
];

export const produccionMensual = [
  { periodo: "Ene", produccion: 280, facturacion: 320 },
  { periodo: "Feb", produccion: 300, facturacion: 340 },
  { periodo: "Mar", produccion: 320, facturacion: 360 },
  { periodo: "Abr", produccion: 310, facturacion: 350 }
];

export const utilidadMensual = [
  { periodo: "Ene", utilidad: 35_000_000, margen: 22 },
  { periodo: "Feb", utilidad: 40_000_000, margen: 24 },
  { periodo: "Mar", utilidad: 52_000_000, margen: 27 },
  { periodo: "Abr", utilidad: 53_000_000, margen: 25 }
];

export interface FacturaRow {
  tipo: "CxC" | "CxP";
  numero: string;
  tercero: string;
  grupo: string;
  ciudad: string;
  fechaFactura: string;
  fechaVencimiento: string;
  diasMora: number;
  estado: string;
  valor: number;
  abonos: number;
  saldo: number;
  rangoMora: string;
}

export const facturasDemo: FacturaRow[] = [
  {
    tipo: "CxC",
    numero: "FAC-1001",
    tercero: "Cliente A",
    grupo: "Industrial",
    ciudad: "Bogotá",
    fechaFactura: "2026-01-10",
    fechaVencimiento: "2026-02-10",
    diasMora: 15,
    estado: "Vencida",
    valor: 50_000_000,
    abonos: 10_000_000,
    saldo: 40_000_000,
    rangoMora: "0-30"
  },
  {
    tipo: "CxC",
    numero: "FAC-1012",
    tercero: "Cliente B",
    grupo: "Retail",
    ciudad: "Medellín",
    fechaFactura: "2025-12-01",
    fechaVencimiento: "2026-01-01",
    diasMora: 70,
    estado: "Vencida",
    valor: 80_000_000,
    abonos: 30_000_000,
    saldo: 50_000_000,
    rangoMora: "61-90"
  },
  {
    tipo: "CxP",
    numero: "PROV-3301",
    tercero: "Proveedor X",
    grupo: "Materia prima",
    ciudad: "Barranquilla",
    fechaFactura: "2026-01-20",
    fechaVencimiento: "2026-02-20",
    diasMora: 0,
    estado: "Por vencer",
    valor: 60_000_000,
    abonos: 0,
    saldo: 60_000_000,
    rangoMora: "0-30"
  }
];

