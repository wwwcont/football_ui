import { Link } from 'react-router-dom';
import { Match, Player, Team } from '../../types/domain';
import { StatusBadge } from '../ui/Primitives';

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="card flex items-center gap-3">
      <img src={team.logoUrl} className="h-12 w-12 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800" />
      <div className="min-w-0">
        <p className="truncate font-medium">{team.name}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{team.city} · {team.stats.points} pts</p>
      </div>
    </Link>
  );
}

export function PlayerCard({ player, teamName }: { player: Player; teamName: string }) {
  return (
    <Link to={`/players/${player.id}`} className="card flex items-center gap-3">
      <img src={player.avatarUrl} className="h-11 w-11 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="min-w-0">
        <p className="truncate font-medium">{player.displayName} <span className="text-zinc-400">#{player.number}</span></p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{teamName} · {player.position}</p>
      </div>
    </Link>
  );
}

export function MatchCard({ match, home, away }: { match: Match; home: Team; away: Team }) {
  return (
    <Link to={`/matches/${match.id}`} className="card block">
      <div className="mb-3 flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Round {match.round}</span>
        <StatusBadge label={match.status} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <p className="truncate">{home.shortName}</p>
        <p className="font-semibold">{match.homeScore ?? '-'}:{match.awayScore ?? '-'}</p>
        <p className="truncate text-right">{away.shortName}</p>
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{match.date} · {match.time} · {match.venue}</p>
    </Link>
  );
}
