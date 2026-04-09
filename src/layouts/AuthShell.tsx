import { Outlet } from 'react-router-dom';

export function AuthShell() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <Outlet />
      </div>
    </div>
  );
}
