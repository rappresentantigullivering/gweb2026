'use client';

import s from './riservata.module.css';
import { cx, accentVar } from './types';
import { AVAILABLE_ROLES, roleAccent } from './areas';

export interface RaRoleSelectorProps {
  selected: string[];
  onToggle: (roleId: string) => void;
  className?: string;
}

/**
 * Selettore multiplo dei ruoli. Nel pannello admin lo stesso blocco era
 * ripetuto tre volte (creazione, modifica, approvazione).
 */
export function RaRoleSelector({ selected, onToggle, className }: RaRoleSelectorProps) {
  return (
    <div className={cx(s.roleGrid, className)} role="group" aria-label="Ruoli assegnati">
      {AVAILABLE_ROLES.map((role) => {
        const isSelected = selected.includes(role.id);
        return (
          <button
            key={role.id}
            type="button"
            aria-pressed={isSelected}
            className={cx(s.roleCard, isSelected && s.roleCardSelected)}
            style={accentVar(roleAccent(role.id))}
            onClick={() => onToggle(role.id)}
          >
            <span className={s.roleCheck}>
              {isSelected && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className={s.roleText}>
              <span className={s.roleLabel}>{role.label}</span>
              <span className={s.roleDesc}>{role.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
