import { BarChart3, Calendar, Home, Menu, Moon, Search, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../app/ThemeProvider';

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn btn-secondary px-3 py-1.5" aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function BottomNav() {
  const items = [
    { to: '/', label: 'Главная', icon: Home },
    { to: '/table', label: 'Таблица', icon: BarChart3 },
    { to: '/matches', label: 'Матчи', icon: Calendar },
    { to: '/search', label: 'Поиск', icon: Search },
    { to: '/teams', label: 'Меню', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 md:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-zinc-500 transition-colors [&.active]:text-zinc-900 dark:text-zinc-400 dark:[&.active]:text-zinc-100"
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
  return (
    <header className="sticky top-0 z-10 hidden border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85 md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link to="/" className="font-semibold">Football Tournament Tracker</Link>
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link to="/table">Table</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/players">Players</Link>
          <Link to="/events">Events</Link>
          <Link to="/admin">Admin</Link>
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
