import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export function RaList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.list, className)}>{children}</div>;
}

export interface RaListItemProps {
  title: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function RaListItem({ title, meta, actions, className }: RaListItemProps) {
  return (
    <div className={cx(s.listItem, className)}>
      <div className={s.listItemMain}>
        <div className={s.listItemTitle}>{title}</div>
        {meta && <div className={s.listItemMeta}>{meta}</div>}
      </div>
      {actions && <div className={s.listItemActions}>{actions}</div>}
    </div>
  );
}
