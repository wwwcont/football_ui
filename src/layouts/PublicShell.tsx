import { Link, NavLink, Outlet } from 'react-router-dom';
import { cn } from '../lib/format';

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/matches', label: 'Матчи' },
  { to: '/table', label: 'Таблица' },
  { to: '/teams', label: 'Команды' },
  { to: '/search', label: 'Поиск' },
];

export function PublicShell() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="text-sm font-semibold tracking-wide">ФУТБОЛЬНАЯ ЛИГА</Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('text-sm', isActive ? 'font-semibold text-white' : 'text-zinc-400')}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/admin/login" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200">Вход</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 pb-24 md:pb-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-800 bg-zinc-950 md:hidden">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('py-3 text-center text-[11px] font-medium', isActive ? 'text-white' : 'text-zinc-500')}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
