import { BarChart3, Calendar, Home, Menu, Search } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export function BottomNav() {
  const items = [
    { to: '/', label: 'Главная', icon: Home },
    { to: '/table', label: 'Таблица', icon: BarChart3 },
    { to: '/matches', label: 'Матчи', icon: Calendar },
    { to: '/search', label: 'Поиск', icon: Search },
    { to: '/teams', label: 'Меню', icon: Menu },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-white md:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className="flex flex-col items-center py-2 text-xs text-zinc-500 [&.active]:text-zinc-900">
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function DesktopTopbar() {
  return <header className="sticky top-0 z-10 hidden border-b bg-white/90 backdrop-blur md:block"><div className="mx-auto flex max-w-6xl items-center justify-between p-4"><Link to="/" className="font-semibold">Football Tournament Tracker</Link><div className="flex gap-4 text-sm"><Link to="/table">Table</Link><Link to="/matches">Matches</Link><Link to="/teams">Teams</Link><Link to="/players">Players</Link><Link to="/events">Events</Link><Link to="/admin">Admin</Link></div></div></header>;
}
