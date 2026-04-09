import { BarChart3, Calendar, Home, LogIn, Moon, Search, Sun, UserRound } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../app/ThemeProvider';

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
  const inCabinet = hasSession();

  return (
    <header className="sticky top-0 z-10 hidden border-b border-zinc-800 bg-black/95 backdrop-blur md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link to="/" className="flex items-center gap-3 text-zinc-100">
          <img src="/icons/tournament-logo.svg" className="h-9 w-9 object-contain" alt="Логотип турнира" />
          <span className="font-semibold">United Football League</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-300">
          <Link to="/table">Таблица</Link>
          <Link to="/matches">Матчи</Link>
          <Link to="/teams">Команды</Link>
          <Link to="/players">Игроки</Link>
          <Link to={inCabinet ? '/cabinet' : '/login'}>{inCabinet ? 'Личный кабинет' : 'Вход'}</Link>
          <ThemeSwitch />
        </div>
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
