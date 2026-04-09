import { useParams } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { usePlayer } from '../../hooks/usePlayer';
import { useTeam } from '../../hooks/useTeam';

export function PlayerDetailsPage() {
  const { playerId = '' } = useParams();
  const player = usePlayer(playerId);
  const team = useTeam(player.data?.teamId ?? '');

  if (player.isLoading || (player.data?.teamId && team.isLoading)) return <LoadingState />;
  if (player.error || team.error) return <ErrorState message={player.error ?? team.error ?? undefined} />;
  if (!player.data) return <EmptyState title="Player not found" />;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <img src={player.data.avatarUrl} alt={player.data.displayName} className="h-12 w-12 rounded-full border border-zinc-200" />
          <div>
            <h1 className="text-lg font-semibold">{player.data.displayName}</h1>
            <p className="text-sm text-zinc-600">{team.data?.name} · #{player.data.number} · {player.data.position}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['Matches', player.data.stats.matches],
          ['Goals', player.data.stats.goals],
          ['Assists', player.data.stats.assists],
          ['Cards', player.data.stats.yellow + player.data.stats.red],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
