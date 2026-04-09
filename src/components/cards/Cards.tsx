import { Link } from 'react-router-dom';
import { Match, Player, Team } from '../../types/domain';
import { StatusBadge } from '../ui/Primitives';

export function TeamCard({ team }: { team: Team }) {
  return <Link to={`/teams/${team.id}`} className="card flex items-center gap-3 p-3"><img src={team.logoUrl} className="h-12 w-12 rounded-lg border bg-zinc-50" /><div><p className="font-medium">{team.name}</p><p className="text-xs text-zinc-500">{team.city} · #{team.stats.points} pts</p></div></Link>;
}

export function PlayerCard({ player, teamName }: { player: Player; teamName: string }) {
  return <Link to={`/players/${player.id}`} className="card flex items-center gap-3 p-3"><img src={player.avatarUrl} className="h-11 w-11 rounded-full border" /><div><p className="font-medium">{player.displayName} <span className="text-zinc-400">#{player.number}</span></p><p className="text-xs text-zinc-500">{teamName} · {player.position}</p></div></Link>;
}

export function MatchCard({ match, home, away }: { match: Match; home: Team; away: Team }) {
  return <Link to={`/matches/${match.id}`} className="card block p-3"><div className="mb-2 flex items-center justify-between text-xs text-zinc-500"><span>Round {match.round}</span><StatusBadge label={match.status} /></div><div className="flex items-center justify-between"><p>{home.shortName}</p><p className="font-semibold">{match.homeScore ?? '-'}:{match.awayScore ?? '-'}</p><p>{away.shortName}</p></div><p className="mt-2 text-xs text-zinc-500">{match.date} · {match.time} · {match.venue}</p></Link>;
}
