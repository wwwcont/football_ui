import { Link } from 'react-router-dom';
import type { Match, Team } from '../../domain/models';
import { cn, statusLabel, statusTone } from '../../lib/format';
import { TeamLogo } from './TeamLogo';

export function MatchCard({ match, homeTeam, awayTeam }: { match: Match; homeTeam?: Team; awayTeam?: Team }) {
  const centerValue =
    match.status === 'scheduled' || match.status === 'postponed'
      ? match.time
      : `${match.homeScore ?? 0}:${match.awayScore ?? 0}`;

  return (
    <Link to={`/matches/${match.id}`} className="panel-matte block rounded-2xl p-3.5 transition hover:border-[#a23a50]/35">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.11em] text-zinc-500">
        <span>Тур {match.round}</span>
        <span className={cn('rounded-full px-2 py-0.5 font-semibold', statusTone[match.status])}>{statusLabel[match.status]}</span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <TeamLogo team={homeTeam} className="h-10 w-10" />
          <div className="min-w-0">
            <p className="truncate text-[11px] uppercase tracking-[0.08em] text-zinc-500">Хозяева</p>
            <p className="truncate text-sm font-semibold text-zinc-100">{homeTeam?.shortName ?? 'TBD'}</p>
          </div>
        </div>

        <div className="relative min-w-[72px] text-center">
          <span className="absolute left-1/2 top-1/2 h-11 w-px -translate-x-1/2 -translate-y-1/2 accent-line" />
          <p className={cn('relative text-xl font-bold tabular-nums', match.status === 'live' ? 'text-rose-100' : 'text-zinc-100')}>{centerValue}</p>
          <p className="relative text-[10px] uppercase tracking-[0.12em] text-zinc-500">центр матча</p>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2.5">
          <div className="min-w-0 text-right">
            <p className="truncate text-[11px] uppercase tracking-[0.08em] text-zinc-500">Гости</p>
            <p className="truncate text-sm font-semibold text-zinc-100">{awayTeam?.shortName ?? 'TBD'}</p>
          </div>
          <TeamLogo team={awayTeam} className="h-10 w-10" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t line-accent pt-2 text-[11px] text-zinc-400">
        <span>{match.date}</span>
        <span>{match.venue}</span>
      </div>
    </Link>
  );
}
