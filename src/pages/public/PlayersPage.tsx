import { PlayerRow } from '../../components/public/PlayerRow';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeams } from '../../hooks/useTeams';

export function PlayersPage() {
  const players = usePlayers();
  const teams = useTeams();

  if (players.isLoading || teams.isLoading) return <LoadingState />;
  if (players.error || teams.error) return <ErrorState message={players.error ?? teams.error ?? undefined} />;
  if (!players.data.length) return <EmptyState title="Игроки не найдены" />;

  return (
    <div className="space-y-2">
      {players.data.map((player) => (
        <PlayerRow key={player.id} player={player} team={teams.data.find((team) => team.id === player.teamId)} />
      ))}
    </div>
  );
}
