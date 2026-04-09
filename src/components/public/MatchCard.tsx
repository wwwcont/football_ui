import { Link } from 'react-router-dom';
import type { Match, Team } from '../../domain/models';
import { statusLabel, statusTone, cn } from '../../lib/format';

export function MatchCard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  return (
    <Link to={`/matches/${match.id}`} className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Тур {match.round}</span>
        <span className={cn('rounded-full px-2 py-1 text-[11px] font-medium', statusTone[match.status])}>{statusLabel[match.status]}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-100">{homeTeam?.shortName ?? 'Хозяева'}</p>
        <p className="text-base font-semibold tabular-nums text-zinc-100">
          {match.status === 'scheduled' || match.status === 'postponed' ? match.time : `${match.homeScore ?? 0}:${match.awayScore ?? 0}`}
        </p>
        <p className="text-sm font-semibold text-zinc-100">{awayTeam?.shortName ?? 'Гости'}</p>
      </div>
      <p className="mt-2 text-xs text-zinc-400">{match.date} · {match.venue}</p>
    </Link>
  );
}
