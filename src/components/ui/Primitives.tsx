import { ReactNode } from 'react';

export function PageContainer({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 pb-24 md:p-6 md:pb-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return <div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{title}</h2>{right}</div>;
}

export function StatusBadge({ label }: { label: string }) {
  return <span className="rounded-full border border-zinc-300 px-2 py-0.5 text-xs uppercase text-zinc-600">{label}</span>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="card p-6 text-center"><p className="font-medium">{title}</p><p className="text-sm text-zinc-500">{description}</p></div>;
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return <div className="card p-4"><p className="text-xs uppercase text-zinc-500">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>;
}
