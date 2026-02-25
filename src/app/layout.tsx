import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Caldas - Dashboard",
  description:
    "Panel financiero de Grupo Caldas para CxC, CxP y costos."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

