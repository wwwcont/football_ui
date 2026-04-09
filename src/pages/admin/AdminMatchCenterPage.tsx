import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatch } from '../../hooks/useMatch';
import { statusLabel } from '../../lib/format';
import { mockRepository } from '../../repositories/mockRepository';
import type { MatchEvent } from '../../domain/models';

const eventTypes: MatchEvent['type'][] = ['goal', 'yellow_card', 'red_card', 'substitution', 'own_goal'];

export function AdminMatchCenterPage() {
  const { matchId = '' } = useParams();
  const match = useMatch(matchId);
  const [minute, setMinute] = useState(1);
  const [eventType, setEventType] = useState<MatchEvent['type']>('goal');

  if (match.isLoading) return <LoadingState />;
  if (match.error) return <ErrorState message={match.error} />;
  if (!match.data) return <EmptyState title="Матч не найден" />;

  const addEvent = async (teamId: string) => {
    await mockRepository.addMatchEvent(match.data!.id, { minute, type: eventType, teamId });
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader title={`Матч-центр · ${match.data.id}`} description="Создание событий и управление матчем" />
      <div className="rounded-xl bg-zinc-900 p-4">
        <p className="text-xs text-zinc-500">Статус</p>
        <p className="mt-1 text-sm font-medium">{statusLabel[match.data.status]}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <input value={minute} min={1} max={130} onChange={(e) => setMinute(Number(e.target.value))} type="number" className="h-10 rounded-lg bg-zinc-800 px-3" />
          <select value={eventType} onChange={(e) => setEventType(e.target.value as MatchEvent['type'])} className="h-10 rounded-lg bg-zinc-800 px-3">
            {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={() => void addEvent(match.data!.homeTeamId)} className="h-10 rounded-lg bg-zinc-800 text-sm">Событие хозяевам</button>
          <button onClick={() => void addEvent(match.data!.awayTeamId)} className="h-10 rounded-lg bg-zinc-800 text-sm">Событие гостям</button>
        </div>
        <button
          className="mt-4 h-10 w-full rounded-lg bg-white text-sm font-medium text-zinc-900"
          onClick={async () => {
            await mockRepository.finishMatch(match.data!.id);
            window.location.reload();
          }}
        >
          Завершить матч
        </button>
      </div>

      <div className="rounded-xl bg-zinc-900 p-4">
        <h3 className="text-sm font-semibold">Журнал событий</h3>
        <div className="mt-2 space-y-1 text-sm text-zinc-300">
          {match.data.events.length ? match.data.events.map((event) => <p key={event.id}>{event.minute}' · {event.type} · {event.teamId}</p>) : <p className="text-zinc-400">Событий пока нет.</p>}
        </div>
      </div>
    </div>
  );
}
