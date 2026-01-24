import { DSButton, DSCard, DSCardDescription, DSCardHeader, DSCardTitle } from '@klastack-nx/web/ui';
import Link from 'next/link';


import { REPO_URL } from '../../lib/site';

import type { Metadata } from 'next';

const docsLinks = [
  {
    title: 'Repository README',
    description: 'Overview of the workspace, local setup, and development workflow.',
    href: `${REPO_URL}#readme`,
    external: true,
  },
  {
    title: 'Database guide',
    description: 'Migration workflow, schema notes, and database configuration.',
    href: `${REPO_URL}/blob/main/docs/database.md`,
    external: true,
  },
  {
    title: 'Runtime paths',
    description: 'Details on runtime path generation and setup expectations.',
    href: `${REPO_URL}/blob/main/docs/runtime-paths.md`,
    external: true,
  },
  {
    title: 'Portal app',
    description: 'Explore the Next.js portal app in the monorepo.',
    href: `${REPO_URL}/tree/main/apps/portal`,
    external: true,
  },
];

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Documentation and references for the Klarstack workspace.',
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Docs</h1>
        <p className="text-sm text-muted-foreground">
          Quick links to the most useful documents in the repository. Keep it lightweight and
          discoverable.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {docsLinks.map((link) => (
          <DSCard key={link.title}>
            <DSCardHeader>
              <DSCardTitle className="text-base">{link.title}</DSCardTitle>
              <DSCardDescription>{link.description}</DSCardDescription>
              <DSButton asChild variant="link" className="mt-2 w-fit px-0">
                <Link href={link.href} target={link.external ? '_blank' : undefined} rel="noreferrer">
                  View docs
                </Link>
              </DSButton>
            </DSCardHeader>
          </DSCard>
        ))}
      </div>
    </div>
  );
}
