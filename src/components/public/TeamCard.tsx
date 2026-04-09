import { Link } from 'react-router-dom';
import type { Team } from '../../domain/models';
import { TeamLogo } from './TeamLogo';

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="panel-matte flex items-center gap-3 rounded-2xl p-3 transition hover:border-[#a23a50]/35">
      <TeamLogo team={team} className="h-11 w-11" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-zinc-100">{team.name}</p>
        <p className="truncate text-xs text-zinc-400">{team.city} · {team.stats.points} очков</p>
      </div>
    </Link>
  );
}
