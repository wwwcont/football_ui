import { Link } from 'react-router-dom';

export function ForbiddenPage() {
  return <State title="403" subtitle="Forbidden" />;
}

export function NotFoundPage() {
  return <State title="404" subtitle="Page not found" />;
}

function State({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
        <p className="text-2xl font-semibold">{title}</p>
        <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
        <Link to="/" className="mt-4 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">Back home</Link>
      </div>
    </div>
  );
}
