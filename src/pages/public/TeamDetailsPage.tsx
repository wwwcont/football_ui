import { Link, useParams } from 'react-router-dom';
import { TeamLogo } from '../../components/public/TeamLogo';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeam } from '../../hooks/useTeam';

export function TeamDetailsPage() {
  const { teamId = '' } = useParams();
  const team = useTeam(teamId);
  const players = usePlayers();

  if (team.isLoading || players.isLoading) return <LoadingState />;
  if (team.error || players.error) return <ErrorState message={team.error ?? players.error ?? undefined} />;
  if (!team.data) return <EmptyState title="Команда не найдена" />;

  const roster = players.data.filter((player) => player.teamId === team.data?.id);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center gap-3">
          <TeamLogo team={team.data} className="h-12 w-12 rounded-full border border-zinc-700 object-cover" />
          <div>
            <h1 className="text-lg font-semibold">{team.data.name}</h1>
            <p className="text-sm text-zinc-400">{team.data.city} · Тренер {team.data.coach}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h2 className="text-sm font-semibold">Состав</h2>
        <div className="mt-3 space-y-2">
          {roster.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`} className="flex items-center justify-between rounded-lg border border-zinc-800 px-3 py-2">
              <p className="text-sm">{player.displayName}</p>
              <p className="text-xs text-zinc-400">#{player.number} · {player.position}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
