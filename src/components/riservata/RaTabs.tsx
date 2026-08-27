'use client';

import s from './riservata.module.css';
import { cx } from './types';

export interface RaTabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  size?: 'sm' | 'md';
  ariaLabel?: string;
  className?: string;
}

export function RaTabs<T extends string>({ tabs, active, onChange, size = 'md', ariaLabel, className }: RaTabsProps<T>) {
  return (
    <div className={cx(s.tabs, className)} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={cx(s.tab, s[`tab_${size}`], active === tab.id && s.tabActive)}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
