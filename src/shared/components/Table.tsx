import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

/**
 * Table
 *
 * Generic reusable table component. Accepts typed column definitions
 * with optional custom render functions, row click handlers, and an
 * empty-state message.
 */
function Table<T extends object>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available.',
  className = '',
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-dark/50 bg-border-dark/20 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            {columns.map((col) => (
              <th key={String(col.key)} className={`px-6 py-4 ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-dark/30">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-white/5 transition-colors group ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={`px-6 py-4 ${col.className ?? ''}`}>
                    {col.render
                      ? col.render(row, rowIndex)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
export type { Column, TableProps };
