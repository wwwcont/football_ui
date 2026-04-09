import { Link } from 'react-router-dom';
import type { Match, Team } from '../../domain/models';
import { statusLabel } from '../../lib/format';

export function MatchCard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  const score =
    match.status === 'scheduled' || match.status === 'postponed'
      ? match.time
      : `${match.homeScore ?? 0}:${match.awayScore ?? 0}`;

  return (
    <Link to={`/matches/${match.id}`} className="block rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3">
      <div className="flex items-center justify-between text-[11px] text-zinc-500">
        <span>Тур {match.round}</span>
        <span>{statusLabel[match.status]}</span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <p className="truncate text-sm text-zinc-100">{homeTeam?.shortName ?? 'Хозяева'}</p>
        <p className="text-sm font-semibold tabular-nums text-zinc-100">{score}</p>
        <p className="truncate text-right text-sm text-zinc-100">{awayTeam?.shortName ?? 'Гости'}</p>
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">{match.date} · {match.venue}</p>
    </Link>
  );
}
