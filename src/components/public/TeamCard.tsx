import { Link } from 'react-router-dom';
import type { Team } from '../../domain/models';

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
      <img src={team.logoUrl} alt={team.name} className="h-10 w-10 rounded-full border border-zinc-200 object-cover" />
      <div>
        <p className="text-sm font-semibold text-zinc-900">{team.name}</p>
        <p className="text-xs text-zinc-600">{team.city} · {team.stats.points} pts</p>
      </div>
    </Link>
  );
}
