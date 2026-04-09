import type { ReactNode } from 'react';

export function AdminPageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className="space-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
          {description ? <p className="text-sm text-zinc-600">{description}</p> : null}
        </div>
        {actions}
      </div>
    </header>
  );
}
