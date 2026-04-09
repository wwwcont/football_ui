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
      <div className="panel-matte rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <TeamLogo team={team.data} className="h-14 w-14" />
          <div>
            <h1 className="text-lg font-semibold">{team.data.name}</h1>
            <p className="text-sm text-zinc-400">{team.data.city} · Тренер {team.data.coach}</p>
          </div>
        </div>
      </div>
      <div className="panel-matte rounded-2xl p-4">
        <h2 className="section-title">Состав</h2>
        <div className="mt-3 space-y-2">
          {roster.map((player) => (
            <Link key={player.id} to={`/players/${player.id}`} className="panel-soft flex items-center justify-between rounded-xl px-3 py-2.5">
              <p className="text-sm">{player.displayName}</p>
              <p className="text-xs text-zinc-400">#{player.number} · {player.position}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
