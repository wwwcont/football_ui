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
  if (!player.data) return <EmptyState title="Игрок не найден" />;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center gap-3">
          <img src={player.data.avatarUrl} alt={player.data.displayName} className="h-12 w-12 rounded-full border border-zinc-700" />
          <div>
            <h1 className="text-lg font-semibold">{player.data.displayName}</h1>
            <p className="text-sm text-zinc-400">{team.data?.name} · #{player.data.number} · {player.data.position}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          ['Матчи', player.data.stats.matches],
          ['Голы', player.data.stats.goals],
          ['Ассисты', player.data.stats.assists],
          ['Карточки', player.data.stats.yellow + player.data.stats.red],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-xs text-zinc-400">{label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
