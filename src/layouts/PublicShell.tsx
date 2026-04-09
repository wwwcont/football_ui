import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { appLogoDataUrl } from '../logo';
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const profileItem = isAuthenticated
    ? { to: '/cabinet', label: 'Кабинет' }
    : { to: '/auth/login', label: 'Вход' };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {!isHome ? (
              <button
                onClick={handleBack}
                className="inline-flex h-10 items-center rounded-xl bg-zinc-900 px-3 text-sm font-medium text-zinc-100 md:h-9"
                type="button"
              >
                ← Назад
              </button>
            ) : null}
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-100">
              <img src={appLogoDataUrl} alt="Лого" className="h-8 w-8 rounded-lg object-cover" />
              ФУТБОЛЬНАЯ ЛИГА
            </Link>
          </div>
          <nav className="hidden items-center gap-4 md:flex">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('text-sm', isActive ? 'font-semibold text-rose-200' : 'text-zinc-400')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={profileItem.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg bg-zinc-900 px-3 py-2 text-xs',
                  isActive ? 'bg-[#3a1119] text-rose-100' : 'text-zinc-300',
                )
              }
            >
              {profileItem.label}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-4 pb-28 md:pb-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 bg-zinc-950/95 pb-[max(env(safe-area-inset-bottom),0px)] backdrop-blur md:hidden">
        <div className="grid grid-cols-5 px-2 py-2">
          {[...primaryNavItems, profileItem].map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-2 py-3.5 text-center text-xs font-medium transition-colors',
                  isActive ? 'bg-[#4f1824] text-rose-100' : 'text-zinc-400',
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
