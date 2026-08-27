import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export interface RaTableProps {
  className?: string;
  children: ReactNode;
}

/** Tabella con scorrimento orizzontale proprio: il corpo pagina non scorre mai. */
export function RaTable({ className, children }: RaTableProps) {
  return (
    <div className={s.tableWrap}>
      <table className={cx(s.table, className)}>{children}</table>
    </div>
  );
}

RaTable.Empty = function RaTableEmpty({ colSpan, children }: { colSpan: number; children: ReactNode }) {
  return (
    <tr>
      <td className={s.tableEmpty} colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
};
