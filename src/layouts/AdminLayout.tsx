import { LogOut } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#0d0d0d]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-black p-3 text-zinc-100">
        <p className="font-medium">Панель турнира</p>
        <button className="btn btn-secondary" onClick={onLogout}><LogOut className="mr-1 h-4 w-4" />Выход</button>
      </header>
      <Outlet />
    </div>
  );
}
