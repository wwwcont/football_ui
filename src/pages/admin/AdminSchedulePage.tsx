import { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { mockRepository } from '../../repositories/mockRepository';

export function AdminSchedulePage() {
  const matches = useMatches();
  const [id, setId] = useState('m-new');

  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Расписание" description="Туры и слоты матчей + создание новых событий" />
      <div className="rounded-xl bg-zinc-900 p-4">
        <div className="grid gap-2 md:grid-cols-2">
          <input value={id} onChange={(e) => setId(e.target.value)} className="h-10 rounded-lg bg-zinc-800 px-3" placeholder="ID матча" />
          <button
            className="h-10 rounded-lg bg-[#6d2432] text-rose-100"
            onClick={async () => {
              await mockRepository.createMatch({
                id,
                round: 15,
                date: '2026-04-20',
                time: '19:30',
                venue: 'Новая Арена',
                homeTeamId: 't1',
                awayTeamId: 't6',
                status: 'scheduled',
              });
              window.location.reload();
            }}
          >
            Создать матч
          </button>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {matches.data.map((match) => (
            <div key={match.id} className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2">
              <span>Тур {match.round} · {match.id}</span>
              <span className="text-zinc-400">{match.date} {match.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
