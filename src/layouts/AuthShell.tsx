import { Outlet } from 'react-router-dom';

export function AuthShell() {
  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
