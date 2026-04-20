'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Chi siamo', href: '/chi-siamo' },
  {
    label: 'Elezioni Studentesche',
    href: '/elezioni-studentesche',
    children: [
      { label: 'Scopri i candidati', href: '/elezioni-studentesche/candidati' },
      { label: 'Programma elettorale', href: '/elezioni-studentesche/programma' },
      { label: 'Gioca a Gulliver46', href: '/elezioni-studentesche/gulliver46' },
    ],
  },
  {
    label: 'Associazione Culturale',
    href: '/associazione-culturale',
    children: [
      { label: 'Convenzioni', href: '/associazione-culturale/convenzioni' },
      { label: 'Gulliver Rock', href: '/associazione-culturale/gulliver-rock' },
    ],
  },
  { label: 'Rappresentanza', href: '/rappresentanza' },
  {
    label: 'Matricole',
    href: '/matricole',
    children: [
      { label: 'Gruppi WhatsApp & Telegram', href: '/matricole/gruppi' },
      { label: 'Kit dello Studente', href: '/matricole/kit' },
    ],
  },
  { label: 'UDU', href: 'https://unioneuniversitari.it/', external: true },
  { label: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo-gulliver-tondo-png.png"
            alt="Gulliver UNIVPM"
            width={44}
            height={44}
            className={styles.logoImg}
            priority
          />
          <span className={styles.logoText}>GULLIVER</span>
          <span className={styles.logoDot} />
          <span className={styles.logoSub}>UNIVPM</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.desktopNav} aria-label="Menu principale">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
              onMouseLeave={item.children ? handleMouseLeave : undefined}
            >
              {'external' in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${item.children ? styles.hasDropdown : ''}`}
                >
                  {item.label}
                  {item.children && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`${styles.chevron} ${openDropdown === item.label ? styles.chevronOpen : ''}`}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              )}
              {item.children && (
                <div
                  className={`${styles.dropdown} ${openDropdown === item.label ? styles.dropdownOpen : ''}`}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} className={styles.dropdownItem}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* HAMBURGER */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Apri menu"
          aria-expanded={mobileOpen}
          id="mobile-menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

    </header>
    {/* MOBILE MENU */}
    <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`} id="mobile-menu">
      <nav className={styles.mobileNav} aria-label="Menu mobile">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className={styles.mobileNavItem}>
            {'external' in item && item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileNavLink}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => { if (!item.children) setMobileOpen(false); }}
              >
                {item.label}
              </Link>
            )}
            {item.children && (
              <div className={styles.mobileSubMenu}>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={styles.mobileSubLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    → {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/contatti" className="btn btn-primary btn-lg" id="mobile-cta" onClick={() => setMobileOpen(false)}>
          Contattaci
        </Link>
      </nav>
    </div>
</>
  );
}
