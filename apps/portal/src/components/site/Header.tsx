import Link from 'next/link';

import { DOCS_URL, REPO_URL, SITE_NAME } from '../../lib/site';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: DOCS_URL },
  { label: 'GitHub', href: REPO_URL, external: true },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
