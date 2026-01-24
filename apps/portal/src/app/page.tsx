import {
  DSBadge,
  DSButton,
  DSCard,
  DSCardContent,
  DSCardDescription,
  DSCardHeader,
  DSCardTitle,
} from '@klastack-nx/web/ui';
import Link from 'next/link';


import { HowItWorks } from '../components/site/HowItWorks';
import { DOCS_URL, REPO_URL, SITE_TAGLINE } from '../lib/site';

import type { Metadata } from 'next';

const highlights = ['Nx monorepo', 'NestJS-ready', 'Next.js portal', 'Tenancy-first', 'Typed APIs'];

const valueCards = [
  {
    title: 'Nx monorepo foundation',
    description: 'Apps and libraries stay consistent with clean boundaries and shared tooling.',
  },
  {
    title: 'NestJS backend-ready',
    description: 'Launch APIs fast with modules aligned to domain and tenancy concerns.',
  },
  {
    title: 'Next.js public portal',
    description: 'Ship a marketing site that stays close to your product codebase.',
  },
  {
    title: 'Tenancy-first patterns',
    description: 'Workspace-aware helpers and shared entities are ready when you scale.',
  },
  {
    title: 'Design system ready',
    description: 'Shared UI primitives from `libs/web/ui` keep the brand cohesive.',
  },
  {
    title: 'Ops friendly',
    description: 'Nx caching and workspace tooling keep pipelines fast and predictable.',
  },
];

export const metadata: Metadata = {
  title: 'Klarstack Portal',
  description: SITE_TAGLINE,
};

export default function Index() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <DSBadge variant="secondary" className="w-fit">
            Public portal
          </DSBadge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Build B2B SaaS faster with Klarstack.
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">{SITE_TAGLINE}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <DSButton asChild>
              <Link href={DOCS_URL}>View documentation</Link>
            </DSButton>
            <DSButton asChild variant="outline">
              <Link href={REPO_URL} target="_blank" rel="noreferrer">
                GitHub repository
              </Link>
            </DSButton>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item) => (
              <DSBadge key={item} variant="outline">
                {item}
              </DSBadge>
            ))}
          </div>
        </div>
        <DSCard>
          <DSCardHeader>
            <DSCardTitle>Why teams pick Klarstack</DSCardTitle>
            <DSCardDescription>
              Everything you need to ship a secure, scalable SaaS platform.
            </DSCardDescription>
          </DSCardHeader>
          <DSCardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Launch a public portal, product app, and API layers without wiring everything twice.</p>
            <p>Move fast with shared UI and utilities, then grow into tenancy and analytics.</p>
            <p>Stay aligned with Nx best practices while keeping the DX polished.</p>
          </DSCardContent>
        </DSCard>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <HowItWorks />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">What you get</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {valueCards.map((card) => (
              <DSCard key={card.title} className="h-full">
                <DSCardHeader>
                  <DSCardTitle className="text-base">{card.title}</DSCardTitle>
                  <DSCardDescription>{card.description}</DSCardDescription>
                </DSCardHeader>
              </DSCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
