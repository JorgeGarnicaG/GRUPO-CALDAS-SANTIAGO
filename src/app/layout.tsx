import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Caldas - Dashboard Financiero",
  description: "Panel de control CxC, CxP y costos para Grupo Caldas"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-slate-100 antialiased">{children}</body>
    </html>
  );
}

