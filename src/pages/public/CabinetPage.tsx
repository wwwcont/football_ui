import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminSession } from '../../hooks/useAdminSession';
import { cn } from '../../lib/format';

const tabs = [
  { to: '/cabinet', label: 'Профиль' },
  { to: '/cabinet/management', label: 'Админка' },
];

export function CabinetPage() {
  const { session, logout } = useAdminSession();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Личный кабинет</p>
        <h1 className="mt-1 text-lg font-semibold">{session?.name ?? 'Пользователь'}</h1>
        <p className="text-sm text-zinc-400">Роль: {session?.role ?? 'guest'}</p>
      </section>

      <nav className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/cabinet'}
            className={({ isActive }) => cn('rounded-xl px-3 py-2 text-sm', isActive ? 'bg-[#4f1824] text-rose-100' : 'bg-zinc-900 text-zinc-300')}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl bg-zinc-900 p-4">
        <Outlet />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <Link to="/admin" className="rounded-xl bg-zinc-900 px-4 py-3 text-sm">Открыть расширенную админ-панель</Link>
        <button
          className="rounded-xl bg-[#6d2432] px-4 py-3 text-sm text-rose-100"
          onClick={() => {
            logout();
            navigate('/auth/login', { replace: true });
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export function CabinetProfileTab() {
  const { session } = useAdminSession();
  return (
    <div className="space-y-2 text-sm text-zinc-300">
      <p>Вход сохранён: {session ? 'да' : 'нет'}.</p>
      <p>Переходите по вкладкам — сессия остаётся активной и нижнее меню не исчезает.</p>
    </div>
  );
}

export function CabinetManagementTab() {
  return (
    <div className="space-y-2 text-sm text-zinc-300">
      <p>Администратор может редактировать команды, игроков, расписание, матчи и события.</p>
      <p>
        Для полного набора инструментов откройте раздел <Link className="text-rose-200" to="/admin">/admin</Link>.
      </p>
    </div>
  );
}
