import { Link } from 'react-router-dom';
import type { Team } from '../../domain/models';

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
      <img src={team.logoUrl} alt={team.name} className="h-10 w-10 rounded-full border border-zinc-700 object-cover" />
      <div>
        <p className="text-sm font-semibold text-zinc-100">{team.name}</p>
        <p className="text-xs text-zinc-400">{team.city} · {team.stats.points} очков</p>
      </div>
    </Link>
  );
}
