import { LogOut } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const links = [
    ['Dashboard', '/admin'],
    ['Teams', '/admin/teams'],
    ['Players', '/admin/players'],
    ['Matches', '/admin/matches'],
    ['Schedule', '/admin/schedule'],
    ['Events', '/admin/events'],
    ['Users', '/admin/users'],
  ];

  return (
    <div className="md:grid md:min-h-screen md:grid-cols-[230px_1fr]">
      <aside className="hidden border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:block">
        <Link to="/admin" className="mb-4 block text-lg font-semibold">Admin Panel</Link>
        <nav className="space-y-1">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 [&.active]:bg-zinc-900 [&.active]:text-white dark:[&.active]:bg-zinc-100 dark:[&.active]:text-zinc-900">
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div>
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-medium">Tournament Admin</p>
          <button className="btn btn-secondary" onClick={onLogout}><LogOut className="mr-1 h-4 w-4" />Exit</button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
