import { Link } from 'react-router-dom';

export function ForbiddenPage() {
  return <State title="403" subtitle="Нет доступа" />;
}

export function NotFoundPage() {
  return <State title="404" subtitle="Страница не найдена" />;
}

function State({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
        <p className="text-2xl font-semibold">{title}</p>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        <Link to="/" className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm text-zinc-900">На главную</Link>
      </div>
    </div>
  );
}
