import Link from 'next/link';

import { DOCS_URL, REPO_URL, SITE_NAME } from '../../lib/site';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: DOCS_URL },
  { label: 'GitHub', href: REPO_URL, external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-medium text-foreground">{SITE_NAME}</span>
          <span className="ml-2">A modern Nx monorepo starter for B2B SaaS teams.</span>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
