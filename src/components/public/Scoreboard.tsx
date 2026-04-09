import { cn, statusLabel, statusTone } from '../../lib/format';
import type { Match, Team } from '../../domain/models';
import { TeamLogo } from './TeamLogo';

export function Scoreboard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  return (
    <div className="panel-matte sticky top-16 z-10 rounded-xl p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center gap-2">
          <TeamLogo team={homeTeam} className="h-8 w-8 rounded-full object-cover" />
          <p className="text-sm font-semibold text-zinc-100">{homeTeam?.shortName}</p>
        </div>
        <span className={cn('rounded-full px-2 py-1 text-[11px] font-medium', statusTone[match.status])}>{statusLabel[match.status]}</span>
        <div className="flex items-center justify-end gap-2">
          <p className="text-sm font-semibold text-zinc-100">{awayTeam?.shortName}</p>
          <TeamLogo team={awayTeam} className="h-8 w-8 rounded-full object-cover" />
        </div>
      </div>
      <p className="mt-2 text-center text-2xl font-semibold tabular-nums text-zinc-50">{match.homeScore ?? 0}:{match.awayScore ?? 0}</p>
      <p className="mt-1 text-center text-xs text-zinc-400">{match.date} · {match.time} · {match.venue}</p>
    </div>
  );
}
