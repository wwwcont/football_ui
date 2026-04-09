import { Link } from 'react-router-dom';
import type { Match, Team } from '../../domain/models';
import { statusLabel } from '../../lib/format';
import { TeamLogo } from './TeamLogo';

export function MatchCard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  const score =
    match.status === 'scheduled' || match.status === 'postponed'
      ? match.time
      : `${match.homeScore ?? 0}:${match.awayScore ?? 0}`;

  return (
    <Link to={`/matches/${match.id}`} className="block rounded-xl bg-zinc-900 px-3 py-3">
      <div className="flex items-center justify-between text-[11px] text-zinc-500">
        <span>Тур {match.round}</span>
        <span className={match.status === 'live' ? 'font-semibold text-rose-300' : ''}>{statusLabel[match.status]}</span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <TeamLogo team={homeTeam} className="h-6 w-6 rounded-full object-cover" />
          <p className="truncate text-sm text-zinc-100">{homeTeam?.shortName ?? 'Хозяева'}</p>
        </div>
        <p className="text-sm font-semibold tabular-nums text-zinc-100">{score}</p>
        <div className="flex min-w-0 items-center justify-end gap-2">
          <p className="truncate text-right text-sm text-zinc-100">{awayTeam?.shortName ?? 'Гости'}</p>
          <TeamLogo team={awayTeam} className="h-6 w-6 rounded-full object-cover" />
        </div>
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">{match.date} · {match.venue}</p>
    </Link>
  );
}
