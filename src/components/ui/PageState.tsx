import type { ReactNode } from 'react';

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">{label}</div>;
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      {hint ? <p className="mt-1 text-sm text-zinc-600">{hint}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-zinc-300 bg-white p-6">
      <p className="text-sm font-semibold text-zinc-900">Something went wrong</p>
      <p className="mt-1 text-sm text-zinc-600">{message ?? 'Please try again.'}</p>
      {onRetry ? (
        <button onClick={onRetry} className="mt-4 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white">
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function ForbiddenState() {
  return (
    <div className="rounded-xl border border-zinc-300 bg-white p-6 text-center">
      <p className="text-sm font-semibold text-zinc-900">403 — Forbidden</p>
      <p className="mt-1 text-sm text-zinc-600">You do not have permission to open this page.</p>
    </div>
  );
}
