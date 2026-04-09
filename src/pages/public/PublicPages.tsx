import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allEvents, matches, players, standings, teams } from '../../data/mockData';
import { MatchCard, PlayerCard, TeamCard } from '../../components/cards/Cards';
import { Button, SearchInput, Select } from '../../components/ui/FormControls';
import { EmptyState, PageContainer, SectionHeader, StatCard, StatusBadge } from '../../components/ui/Primitives';
import { matchById, playerById, teamById } from '../../utils/selectors';

export function HomePage() { return <PageContainer title="Tournament Dashboard" subtitle="Mobile-first wireframe"><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><StatCard label="Teams" value={teams.length} /><StatCard label="Players" value={players.length} /><StatCard label="Matches" value={matches.length} /><StatCard label="Events" value={allEvents.length} /></div><div className="mt-4 grid gap-4 md:grid-cols-2"><div><SectionHeader title="Today's / Upcoming" />{matches.slice(0, 2).map((m) => <MatchCard key={m.id} match={m} home={teamById(m.homeTeamId)!} away={teamById(m.awayTeamId)!} />)}</div><div><SectionHeader title="Top Teams" />{teams.slice(0, 3).map((t) => <TeamCard key={t.id} team={t} />)}</div></div></PageContainer>; }

export function TablePage() {
  const [group, setGroup] = useState('all');
  const rows = standings.filter((s) => (group === 'all' ? true : s.group === group));
  return <PageContainer title="Tournament Table" action={<Select value={group} onChange={(e) => setGroup(e.target.value)}><option value="all">All groups</option><option value="A">Group A</option></Select>}><div className="card overflow-hidden"><table className="w-full text-sm"><thead className="bg-zinc-100 text-zinc-500"><tr>{['#','Team','P','W','D','L','GF','GA','GD','Pts'].map((h) => <th key={h} className="px-2 py-2 text-left">{h}</th>)}</tr></thead><tbody>{rows.map((r) => <tr key={r.teamId} className="border-t"><td className="px-2 py-2">{r.position}</td><td>{teamById(r.teamId)?.shortName}</td><td>{r.played}</td><td>{r.won}</td><td>{r.drawn}</td><td>{r.lost}</td><td>{r.gf}</td><td>{r.ga}</td><td>{r.gd}</td><td className="font-semibold">{r.points}</td></tr>)}</tbody></table></div></PageContainer>;
}

export function MatchesPage() {
  const [status, setStatus] = useState('all');
  const filtered = matches.filter((m) => status === 'all' || m.status === status);
  return <PageContainer title="Matches" action={<Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All status</option><option value="upcoming">Upcoming</option><option value="live">Live</option><option value="finished">Finished</option></Select>}><div className="space-y-3">{filtered.map((m) => <MatchCard key={m.id} match={m} home={teamById(m.homeTeamId)!} away={teamById(m.awayTeamId)!} />)}</div></PageContainer>;
}

export function MatchDetailsPage() {
  const { id = '' } = useParams();
  const match = matchById(id);
  if (!match) return <PageContainer title="Match"><EmptyState title="Match not found" description="Check URL" /></PageContainer>;
  return <PageContainer title={`${teamById(match.homeTeamId)?.name} vs ${teamById(match.awayTeamId)?.name}`}><div className="card p-4"><div className="flex justify-between"><p className="font-semibold">{match.homeScore ?? '-'}:{match.awayScore ?? '-'}</p><StatusBadge label={match.status} /></div><p className="text-sm text-zinc-500">{match.date} {match.time} · {match.venue}</p></div><div className="mt-4"><SectionHeader title="Events" />{match.events.length ? match.events.map((e) => <div key={e.id} className="card mb-2 p-3 text-sm">{e.minute}' · {e.type} · {playerById(e.playerId || '')?.displayName ?? 'Team event'}</div>) : <EmptyState title="No events yet" description="Events will appear here." />}</div></PageContainer>;
}

export function TeamsPage() { const [q,setQ]=useState(''); const filtered=teams.filter((t)=>t.name.toLowerCase().includes(q.toLowerCase())); return <PageContainer title="Teams"><SearchInput placeholder="Search team" value={q} onChange={(e)=>setQ(e.target.value)} /><div className="mt-3 space-y-3">{filtered.map((t)=><TeamCard key={t.id} team={t} />)}</div></PageContainer>; }

export function TeamDetailsPage() { const {id=''}=useParams(); const team=teamById(id); if(!team) return <PageContainer title="Team"><EmptyState title="Not found" description="No team."/></PageContainer>; const teamPlayers=players.filter((p)=>p.teamId===id); return <PageContainer title={team.name} subtitle={`${team.city} · coach ${team.coach}`}><div className="grid gap-4 md:grid-cols-3"><StatCard label="Position" value={standings.find((s)=>s.teamId===team.id)?.position ?? '-'} /><StatCard label="Points" value={team.stats.points} /><StatCard label="Form" value={team.form.join(' ')} /></div><div className="mt-4"><SectionHeader title="Players" />{teamPlayers.map((p)=><PlayerCard key={p.id} player={p} teamName={team.shortName} />)}</div></PageContainer>; }

export function PlayersPage(){const [team,setTeam]=useState('all'); const filtered=players.filter((p)=>team==='all'||p.teamId===team); return <PageContainer title="Players" action={<Select value={team} onChange={(e)=>setTeam(e.target.value)}><option value="all">All teams</option>{teams.map((t)=><option key={t.id} value={t.id}>{t.shortName}</option>)}</Select>}><div className="space-y-3">{filtered.map((p)=><PlayerCard key={p.id} player={p} teamName={teamById(p.teamId)?.shortName ?? ''} />)}</div></PageContainer>}

export function PlayerDetailsPage(){const {id=''}=useParams(); const p=playerById(id); if(!p) return <PageContainer title="Player"><EmptyState title="Not found" description="No player"/></PageContainer>; return <PageContainer title={p.displayName} subtitle={`${teamById(p.teamId)?.name} · ${p.position}`}><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><StatCard label="Matches" value={p.stats.matches} /><StatCard label="Minutes" value={p.stats.minutes} /><StatCard label="Goals" value={p.stats.goals} /><StatCard label="Assists" value={p.stats.assists} /></div></PageContainer>}

export function EventsPage(){const [type,setType]=useState('all'); const events=allEvents.filter((e)=>type==='all'||e.type===type); return <PageContainer title="Events timeline" action={<Select value={type} onChange={(e)=>setType(e.target.value)}><option value="all">All types</option><option value="goal">Goals</option><option value="yellow_card">Cards</option><option value="substitution">Substitutions</option></Select>}><div className="space-y-2">{events.map((e)=><div key={e.id} className="card p-3 text-sm">{e.minute}' · <b>{e.type}</b> · {teamById(e.teamId)?.shortName}</div>)}</div></PageContainer>}

export function SearchPage(){const [q,setQ]=useState(''); const result=useMemo(()=>({teams:teams.filter((t)=>t.name.toLowerCase().includes(q.toLowerCase())),players:players.filter((p)=>p.displayName.toLowerCase().includes(q.toLowerCase())),matches:matches.filter((m)=>teamById(m.homeTeamId)?.name.toLowerCase().includes(q.toLowerCase())||teamById(m.awayTeamId)?.name.toLowerCase().includes(q.toLowerCase()))}),[q]); return <PageContainer title="Global Search"><SearchInput placeholder="Teams, players, matches" value={q} onChange={(e)=>setQ(e.target.value)} /><div className="mt-4 grid gap-3 md:grid-cols-3"><div><SectionHeader title="Teams" />{result.teams.map((t)=><Link className="card mb-2 block p-2" key={t.id} to={`/teams/${t.id}`}>{t.name}</Link>)}</div><div><SectionHeader title="Players" />{result.players.map((p)=><Link className="card mb-2 block p-2" key={p.id} to={`/players/${p.id}`}>{p.displayName}</Link>)}</div><div><SectionHeader title="Matches" />{result.matches.map((m)=><Link className="card mb-2 block p-2" key={m.id} to={`/matches/${m.id}`}>{teamById(m.homeTeamId)?.shortName} vs {teamById(m.awayTeamId)?.shortName}</Link>)}</div></div></PageContainer>}

export function NotFound(){ return <PageContainer title="Not found"><Link className="btn btn-primary" to="/">Go home</Link></PageContainer>}
