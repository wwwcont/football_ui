import { ArrowLeft, BarChart3, Calendar, Home, LogIn, Moon, Search, Sun, UserRound } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../app/ThemeProvider';
import tournamentLogo from '../../logo.jpg';

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn btn-secondary px-3 py-1.5" aria-label="Переключить тему">
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const hasSession = () => {
  try {
    return Boolean(localStorage.getItem('leagueSession'));
  } catch {
    return false;
  }
};

export function BottomNav() {
  const inCabinet = hasSession();
  const items = [
    { to: '/', label: 'Главная', icon: Home },
    { to: '/table', label: 'Таблица', icon: BarChart3 },
    { to: '/matches', label: 'Матчи', icon: Calendar },
    { to: '/search', label: 'Поиск', icon: Search },
    { to: inCabinet ? '/cabinet' : '/login', label: inCabinet ? 'Кабинет' : 'Вход', icon: inCabinet ? UserRound : LogIn },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-700 bg-black/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-zinc-400 transition-colors [&.active]:text-zinc-100"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function DesktopTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const canGoBack = location.pathname !== '/';

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-3">
        <div className="w-10">
          {canGoBack && (
            <button className="rounded-lg p-2 text-zinc-100 transition hover:bg-zinc-800" onClick={() => navigate(-1)} aria-label="Назад">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        <Link to="/" className="flex items-center gap-3 text-zinc-100">
          <img src={tournamentLogo} className="h-14 w-14 rounded-lg object-cover" alt="Лого турнира" />
          <span className="text-lg font-semibold">Турнирная панель</span>
        </Link>
        <div className="w-10" />
      </div>
    </header>
  );
}

export function MobileThemeAction() {
  return (
    <div className="fixed bottom-20 right-4 z-20 md:hidden">
      <ThemeSwitch />
    </div>
  );
}
