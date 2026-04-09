import type { ReactNode } from 'react';

export function LoadingState({ label = 'Загрузка...' }: { label?: string }) {
  return <div className="rounded-xl bg-zinc-900 p-6 text-sm text-zinc-400">{label}</div>;
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6 text-center">
      <p className="text-sm font-semibold text-zinc-100">{title}</p>
      {hint ? <p className="mt-1 text-sm text-zinc-400">{hint}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">
      <p className="text-sm font-semibold text-zinc-100">Ошибка загрузки</p>
      <p className="mt-1 text-sm text-zinc-400">{message ?? 'Попробуйте повторить запрос.'}</p>
      {onRetry ? (
        <button onClick={onRetry} className="mt-4 rounded-lg bg-white px-3 py-2 text-xs font-medium text-zinc-900">
          Повторить
        </button>
      ) : null}
    </div>
  );
}

export function ForbiddenState() {
  return (
    <div className="rounded-xl bg-zinc-900 p-6 text-center">
      <p className="text-sm font-semibold text-zinc-100">403 — Нет доступа</p>
      <p className="mt-1 text-sm text-zinc-400">У вас недостаточно прав для этой страницы.</p>
    </div>
  );
}
