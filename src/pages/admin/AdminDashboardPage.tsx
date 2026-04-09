import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { LoadingState, ErrorState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { getStandingsViewSettings, saveStandingsViewSettings, type StandingsViewMode } from '../../lib/standingsViewSettings';

const quickLinks = [
  { to: '/admin/teams', label: 'Команды' },
  { to: '/admin/players', label: 'Игроки' },
  { to: '/admin/matches', label: 'Матчи' },
  { to: '/admin/schedule', label: 'Расписание' },
  { to: '/admin/users', label: 'Пользователи' },
];

export function AdminDashboardPage() {
  const matches = useMatches();
  const settings = getStandingsViewSettings();
  const [defaultView, setDefaultView] = useState<StandingsViewMode>(settings.defaultView);
  const [gridColumns, setGridColumns] = useState<number>(settings.gridColumns);
  const [savedLabel, setSavedLabel] = useState('');

  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;

  const liveCount = matches.data.filter((item) => item.status === 'live').length;
  const scheduledCount = matches.data.filter((item) => item.status === 'scheduled').length;

  const handleSave = () => {
    saveStandingsViewSettings({ defaultView, gridColumns });
    setSavedLabel('Настройки сохранены.');
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Дашборд" description="Полное управление данными турнира через UI" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Metric title="Live матчи" value={liveCount} />
        <Metric title="Запланировано" value={scheduledCount} />
        <Metric title="Всего матчей" value={matches.data.length} />
      </div>

      <section className="rounded-xl bg-zinc-900 p-4">
        <h2 className="text-sm font-semibold text-zinc-100">Редактирование данных</h2>
        <p className="mt-1 text-xs text-zinc-400">Через разделы ниже можно редактировать любую основную информацию турнира.</p>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to} className="rounded-lg bg-zinc-800 px-3 py-2 text-center text-xs text-zinc-200">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-zinc-900 p-4">
        <h2 className="text-sm font-semibold text-zinc-100">Настройка вкладки «Таблица»</h2>
        <p className="mt-1 text-xs text-zinc-400">Администратор задает вид по умолчанию и количество колонок для режима «Сетка».</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1 text-xs text-zinc-300">
            Вид по умолчанию
            <select
              value={defaultView}
              onChange={(event) => setDefaultView(event.target.value as StandingsViewMode)}
              className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
            >
              <option value="table">Таблица</option>
              <option value="grid">Сетка сверху вниз</option>
            </select>
          </label>

          <label className="space-y-1 text-xs text-zinc-300">
            Колонки в сетке
            <input
              type="number"
              min={1}
              max={3}
              value={gridColumns}
              onChange={(event) => setGridColumns(Number(event.target.value || 1))}
              className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
            />
          </label>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button type="button" onClick={handleSave} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-900">
            Сохранить
          </button>
          {savedLabel ? <p className="text-xs text-emerald-300">{savedLabel}</p> : null}
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-4">
      <p className="text-xs text-zinc-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
