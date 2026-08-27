import type { CSSProperties } from 'react';

/**
 * CSSProperties non ammette le custom property: questo alias evita di
 * spargere `as React.CSSProperties` a ogni `style={{ '--ra-accent': … }}`.
 */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

/** Costruisce lo style di uno scope colorato. */
export function accentVar(accent?: string): CSSVars | undefined {
  return accent ? ({ ['--ra-accent']: accent } as CSSVars) : undefined;
}

/** Unisce classi ignorando falsy: piu' leggibile di un template literal. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
