import { LogOut } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium">Кабинет команды</p>
        <button className="btn btn-secondary" onClick={onLogout}><LogOut className="mr-1 h-4 w-4" />Выход</button>
      </header>
      <Outlet />
    </div>
  );
}
