import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminSession } from '../hooks/useAdminSession';
import { cn } from '../lib/format';
import { APP_LOGO_URL, FALLBACK_LOGO_URL } from '../lib/logoAsset';

const primaryNavItems = [
  { to: '/', label: 'Главная', icon: '⌂' },
  { to: '/table', label: 'Таблица', icon: '▦' },
  { to: '/matches', label: 'Матчи', icon: '◉' },
  { to: '/search', label: 'Поиск', icon: '⌕' },
];

const titleMap: Record<string, string> = {
  '/': 'Турнирный центр',
  '/table': 'Таблица',
  '/matches': 'Матчи',
  '/search': 'Поиск',
  '/cabinet': 'Кабинет',
  '/auth/login': 'Вход',
};

export function PublicShell() {
  const { isAuthenticated } = useAdminSession();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const activeTitle = Object.entries(titleMap).find(([path]) => location.pathname.startsWith(path) && path !== '/')?.[1]
    ?? titleMap[location.pathname]
    ?? 'Football UI';

  const profileItem = isAuthenticated
    ? { to: '/cabinet', label: 'Кабинет', icon: '◎' }
    : { to: '/auth/login', label: 'Вход', icon: '↦' };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className="app-bg min-h-screen text-zinc-100">
      <header className="sticky top-0 z-30 border-b line-accent bg-[#0a0d12]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {!isHome ? (
              <button
                onClick={handleBack}
                className="panel-soft inline-flex h-10 items-center rounded-xl px-3 text-sm font-medium text-zinc-100 hover:border-[#a23a50]/40"
                type="button"
              >
                ←
              </button>
            ) : null}
            <Link to="/" className="flex min-w-0 items-center gap-2.5">
              <span className="logo-shell h-9 w-9 rounded-lg">
                <img
                  src={APP_LOGO_URL}
                  alt="Лого"
                  className="h-full w-full rounded-lg object-cover p-0.5"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_LOGO_URL;
                  }}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] uppercase tracking-[0.16em] text-zinc-500">football_ui</p>
                <p className="truncate text-sm font-semibold text-zinc-100">{activeTitle}</p>
              </div>
            </Link>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em] transition', isActive ? 'accent-badge' : 'panel-soft text-zinc-300')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={profileItem.to}
              className={({ isActive }) => cn('rounded-xl px-3 py-2 text-xs uppercase tracking-[0.12em]', isActive ? 'accent-badge' : 'panel-soft text-zinc-300')}
            >
              {profileItem.label}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-5 pb-32 md:pb-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t line-accent bg-[#090c11]/95 pb-[max(env(safe-area-inset-bottom),0px)] md:hidden">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-5 gap-1 px-3 py-3">
          {[...primaryNavItems, profileItem].map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative flex min-h-[62px] flex-col items-center justify-center rounded-2xl border border-transparent px-2 text-center transition',
                  isActive ? 'border-[#a23a50]/45 bg-[#7c2233]/20 text-rose-100' : 'text-zinc-400',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-sm">{item.icon}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.11em]">{item.label}</span>
                  {isActive ? <span className="absolute inset-x-4 top-1 h-px accent-line" /> : null}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
