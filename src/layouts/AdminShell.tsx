import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '../lib/format';
import { useAdminSession } from '../hooks/useAdminSession';

const adminItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/teams', label: 'Teams' },
  { to: '/admin/players', label: 'Players' },
  { to: '/admin/matches', label: 'Matches' },
  { to: '/admin/schedule', label: 'Schedule' },
  { to: '/admin/users', label: 'Users' },
];

export function AdminShell() {
  const { session, logout } = useAdminSession();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 md:grid md:grid-cols-[250px_1fr]">
      <aside className="hidden border-r border-zinc-200 bg-white p-4 md:block">
        <Link to="/admin" className="block text-sm font-semibold">ADMIN CONSOLE</Link>
        <p className="mt-1 text-xs text-zinc-500">{session?.name ?? 'Session'}</p>
        <nav className="mt-4 space-y-1">
          {adminItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) => cn('block rounded-lg px-3 py-2 text-sm', isActive ? 'bg-zinc-100 font-semibold text-zinc-950' : 'text-zinc-600')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div>
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
          <div className="flex h-14 items-center justify-between px-4">
            <Link to="/admin" className="text-sm font-semibold md:hidden">Admin</Link>
            <div className="flex gap-2">
              <button className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs" onClick={() => navigate('/')}>Public</button>
              <button
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white"
                onClick={() => {
                  logout();
                  navigate('/auth/login', { replace: true });
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
