import { ReactNode } from 'react';

export function PageContainer({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 pb-24 md:p-6 md:pb-8">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="section-stack">{children}</div>
    </div>
  );
}

export function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{title}</h2>
      {right}
    </div>
  );
}

export function StatusBadge({ label }: { label: string }) {
  return <span className="rounded-full border border-zinc-300 px-2 py-0.5 text-xs uppercase text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">{label}</span>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="card text-center"><p className="font-medium">{title}</p><p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p></div>;
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return <div className="card"><p className="text-xs uppercase text-zinc-500 dark:text-zinc-400">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>;
}
