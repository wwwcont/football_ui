import { Link } from 'react-router-dom';
import type { Team } from '../../domain/models';
import { TeamLogo } from './TeamLogo';

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">
      <TeamLogo team={team} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-semibold text-zinc-100">{team.name}</p>
        <p className="text-xs text-zinc-400">{team.city} · {team.stats.points} очков</p>
      </div>
    </Link>
  );
}
