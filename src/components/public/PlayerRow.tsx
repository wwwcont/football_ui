import { Link } from 'react-router-dom';
import type { Player, Team } from '../../domain/models';

export function PlayerRow({ player, team }: { player: Player; team?: Team }) {
  return (
    <Link to={`/players/${player.id}`} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3">
      <div className="flex items-center gap-3">
        <img src={player.avatarUrl} alt={player.displayName} className="h-9 w-9 rounded-full border border-zinc-700 object-cover" />
        <div>
          <p className="text-sm font-semibold text-zinc-100">{player.displayName}</p>
          <p className="text-xs text-zinc-400">{team?.shortName} · #{player.number} · {player.position}</p>
        </div>
      </div>
      <p className="text-xs tabular-nums text-zinc-300">{player.stats.goals} гол.</p>
    </Link>
  );
}
