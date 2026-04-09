import { cn, statusLabel, statusTone } from '../../lib/format';
import type { Match, Team } from '../../domain/models';
import { TeamLogo } from './TeamLogo';

export function Scoreboard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  const centerValue =
    match.status === 'scheduled' || match.status === 'postponed'
      ? match.time
      : `${match.homeScore ?? 0}:${match.awayScore ?? 0}`;

  return (
    <div className="panel-matte sticky top-16 z-20 rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-zinc-500">
        <span>Раунд {match.round}</span>
        <span className={cn('rounded-full px-2.5 py-1 font-semibold', statusTone[match.status])}>{statusLabel[match.status]}</span>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={homeTeam} className="h-14 w-14 md:h-16 md:w-16" />
          <p className="max-w-[11ch] truncate text-sm font-semibold text-zinc-100">{homeTeam?.shortName ?? homeTeam?.name ?? 'TBD'}</p>
        </div>

        <div className="px-1 text-center">
          <p className={cn('text-4xl font-black tabular-nums tracking-tight md:text-5xl', match.status === 'live' ? 'text-rose-100' : 'text-zinc-100')}>{centerValue}</p>
          <span className="mt-1 block h-px w-20 accent-line" />
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">matchday center</p>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={awayTeam} className="h-14 w-14 md:h-16 md:w-16" />
          <p className="max-w-[11ch] truncate text-sm font-semibold text-zinc-100">{awayTeam?.shortName ?? awayTeam?.name ?? 'TBD'}</p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">{match.date} · {match.time} · {match.venue}</p>
    </div>
  );
}
