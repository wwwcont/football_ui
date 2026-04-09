import { cn, statusLabel, statusTone } from '../../lib/format';
import type { Match, Team } from '../../domain/models';

export function Scoreboard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  return (
    <div className="sticky top-14 z-10 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-100">{homeTeam?.shortName}</p>
        <span className={cn('rounded-full px-2 py-1 text-[11px] font-medium', statusTone[match.status])}>{statusLabel[match.status]}</span>
        <p className="text-sm font-semibold text-zinc-100">{awayTeam?.shortName}</p>
      </div>
      <p className="mt-2 text-center text-2xl font-semibold tabular-nums text-zinc-50">{match.homeScore ?? 0}:{match.awayScore ?? 0}</p>
      <p className="mt-1 text-center text-xs text-zinc-400">{match.date} · {match.time} · {match.venue}</p>
    </div>
  );
}
