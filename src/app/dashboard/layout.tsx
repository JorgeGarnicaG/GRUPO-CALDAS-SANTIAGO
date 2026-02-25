import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:px-6 md:py-6">
          {children}
        </div>
      </main>
    </div>
  );
}

