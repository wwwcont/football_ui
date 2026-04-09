import { Link, NavLink, Outlet } from 'react-router-dom';
import { cn } from '../lib/format';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/matches', label: 'Matches' },
  { to: '/table', label: 'Table' },
  { to: '/teams', label: 'Teams' },
  { to: '/search', label: 'Search' },
];

export function PublicShell() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="text-sm font-semibold tracking-wide">FOOTBALL LEAGUE</Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('text-sm', isActive ? 'font-semibold text-zinc-950' : 'text-zinc-600')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 pb-24 md:pb-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-200 bg-white md:hidden">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('py-3 text-center text-[11px] font-medium', isActive ? 'text-zinc-950' : 'text-zinc-500')}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
