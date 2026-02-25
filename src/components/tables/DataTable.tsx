import { ReactNode } from "react";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  emptyMessage = "Sin registros para mostrar"
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-card/80 shadow-card">
      <div className="max-h-[420px] overflow-auto scrollbar-thin">
        <table className="min-w-full text-xs text-slate-200">
          <thead className="bg-slate-900/70 text-[11px] uppercase tracking-[0.12em] text-slate-400">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-3 py-2 font-medium ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                        ? "text-center"
                        : "text-left"
                  } ${col.width ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[11px] text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {data.map((row, index) => {
              const rowId =
                getRowId?.(row, index) ?? `row-${index.toString()}`;
              return (
                <tr
                  key={rowId}
                  className="border-t border-slate-800/80 odd:bg-slate-900/40 hover:bg-slate-900/80"
                >
                  {columns.map((col) => (
                    <td
                      key={`${rowId}-${String(col.key)}`}
                      className={`whitespace-nowrap px-3 py-2 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "text-left"
                      }`}
                    >
                      {col.render
                        ? col.render(row)
                        : (row as any)[col.key as keyof T]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

