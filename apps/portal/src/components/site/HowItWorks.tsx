const steps = [
  'Start with a pre-wired Nx workspace and clean module boundaries.',
  'Ship APIs with NestJS modules that mirror your domain and tenancy needs.',
  'Launch the public portal and product UI as independent Next.js apps.',
  'Scale confidently with shared UI, types, and infrastructure libraries.',
];

export function HowItWorks() {
  return (
    <section className="rounded-2xl border border-border bg-muted/40 p-6">
      <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Klarstack keeps marketing and product surfaces in sync while staying ready for multi-tenant
        backend growth.
      </p>
      <ul className="mt-4 space-y-3 text-sm text-foreground">
        {steps.map((step) => (
          <li key={step} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
