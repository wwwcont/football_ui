import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAdminSession } from '../hooks/useAdminSession';
import { cn } from '../lib/format';

const primaryNavItems = [
  { to: '/', label: 'Главная' },
  { to: '/table', label: 'Таблица' },
  { to: '/matches', label: 'Матчи' },
  { to: '/search', label: 'Поиск' },
];

export function PublicShell() {
  const { isAuthenticated } = useAdminSession();
  const profileItem = isAuthenticated
    ? { to: '/admin', label: 'Кабинет' }
    : { to: '/admin/login', label: 'Вход' };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-sm font-semibold tracking-wide text-zinc-100">
            ФУТБОЛЬНАЯ ЛИГА
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn('text-sm', isActive ? 'font-semibold text-white' : 'text-zinc-400')}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={profileItem.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md border px-3 py-1.5 text-xs',
                  isActive ? 'border-zinc-500 text-zinc-100' : 'border-zinc-700 text-zinc-300',
                )
              }
            >
              {profileItem.label}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4 pb-24 md:pb-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-800 bg-zinc-950 md:hidden">
        <div className="grid grid-cols-5">
          {[...primaryNavItems, profileItem].map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'px-1 py-3 text-center text-[11px] font-medium',
                  isActive ? 'text-white' : 'text-zinc-500',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
