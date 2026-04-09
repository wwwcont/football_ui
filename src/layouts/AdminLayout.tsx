import { LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#0d0d0d]">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black p-3 text-zinc-100">
        <div className="flex items-center justify-between">
          <p className="font-medium">Админка турнира</p>
          <button className="btn btn-secondary" onClick={onLogout}><LogOut className="mr-1 h-4 w-4" />Выход</button>
        </div>
        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          <NavLink to="/cabinet" end className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 [&.active]:bg-zinc-700 [&.active]:text-zinc-100">Обзор</NavLink>
          <NavLink to="/cabinet/teams" className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 [&.active]:bg-zinc-700 [&.active]:text-zinc-100">Команды</NavLink>
          <NavLink to="/cabinet/players" className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 [&.active]:bg-zinc-700 [&.active]:text-zinc-100">Игроки</NavLink>
          <NavLink to="/cabinet/events" className="rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 [&.active]:bg-zinc-700 [&.active]:text-zinc-100">События</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
