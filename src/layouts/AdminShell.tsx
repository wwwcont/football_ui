import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '../lib/format';
import { useAdminSession } from '../hooks/useAdminSession';
import { appLogoDataUrl } from '../logo';

const adminItems = [
  { to: '/admin', label: 'Дашборд' },
  { to: '/admin/teams', label: 'Команды' },
  { to: '/admin/players', label: 'Игроки' },
  { to: '/admin/matches', label: 'Матчи' },
  { to: '/admin/schedule', label: 'Расписание' },
  { to: '/admin/users', label: 'Пользователи' },
];

export function AdminShell() {
  const { session, logout } = useAdminSession();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 md:grid md:grid-cols-[250px_1fr]">
      <aside className="hidden bg-zinc-900 p-4 md:block">
        <Link to="/admin" className="flex items-center gap-2 text-sm font-semibold">
          <img src={appLogoDataUrl} alt="Лого" className="h-8 w-8 rounded-lg object-cover" />
          АДМИН ПАНЕЛЬ
        </Link>
        <p className="mt-1 text-xs text-zinc-400">{session?.name ?? 'Сессия'}</p>
        <nav className="mt-4 space-y-1">
          {adminItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) => cn('block rounded-lg px-3 py-2 text-sm', isActive ? 'bg-zinc-800 font-semibold text-white' : 'text-zinc-400')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div>
        <header className="sticky top-0 z-20 bg-zinc-950">
          <div className="flex h-14 items-center justify-between px-4">
            <Link to="/admin" className="text-sm font-semibold md:hidden">Админка</Link>
            <div className="flex gap-2">
              <button className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs" onClick={() => navigate('/cabinet')}>ЛК</button>
              <button
                className="rounded-lg bg-white px-3 py-1.5 text-xs text-zinc-900"
                onClick={() => {
                  logout();
                  navigate('/admin/login', { replace: true });
                }}
              >
                Выйти
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
