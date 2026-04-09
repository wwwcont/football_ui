import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allEvents, matches, players, standings, teams } from '../../data/mockData';
import { MatchCard, PlayerCard, TeamCard } from '../../components/cards/Cards';
import { SearchInput, Select } from '../../components/ui/FormControls';
import { EmptyState, PageContainer, SectionHeader, StatCard, StatusBadge } from '../../components/ui/Primitives';
import { matchById, playerById, teamById } from '../../utils/selectors';

export function HomePage() {
  return (
    <PageContainer title="Tournament Dashboard" subtitle="Mobile-first wireframe">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Teams" value={teams.length} />
        <StatCard label="Players" value={players.length} />
        <StatCard label="Matches" value={matches.length} />
        <StatCard label="Events" value={allEvents.length} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section>
          <SectionHeader title="Today's / Upcoming" />
          <div className="space-y-3">
            {matches.slice(0, 2).map((m) => <MatchCard key={m.id} match={m} home={teamById(m.homeTeamId)!} away={teamById(m.awayTeamId)!} />)}
          </div>
        </section>

        <section>
          <SectionHeader title="Top Teams" />
          <div className="space-y-3">{teams.slice(0, 3).map((t) => <TeamCard key={t.id} team={t} />)}</div>
        </section>
      </div>
    </PageContainer>
  );
}

export function TablePage() {
  const [group, setGroup] = useState('all');
  const rows = standings.filter((s) => (group === 'all' ? true : s.group === group));

  return (
    <PageContainer
      title="Tournament Table"
      action={<Select value={group} onChange={(e) => setGroup(e.target.value)}><option value="all">All groups</option><option value="A">Group A</option></Select>}
    >
      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
            <tr>{['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map((h) => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.teamId} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="px-3 py-2">{r.position}</td><td>{teamById(r.teamId)?.shortName}</td><td>{r.played}</td><td>{r.won}</td><td>{r.drawn}</td><td>{r.lost}</td><td>{r.gf}</td><td>{r.ga}</td><td>{r.gd}</td><td className="font-semibold">{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
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
  return <PageContainer title={`${teamById(match.homeTeamId)?.name} vs ${teamById(match.awayTeamId)?.name}`}><div className="card"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{match.homeScore ?? '-'}:{match.awayScore ?? '-'}</p><StatusBadge label={match.status} /></div><p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{match.date} {match.time} · {match.venue}</p></div><div><SectionHeader title="Events" />{match.events.length ? <div className="space-y-2">{match.events.map((e) => <div key={e.id} className="card text-sm">{e.minute}' · {e.type} · {playerById(e.playerId || '')?.displayName ?? 'Team event'}</div>)}</div> : <EmptyState title="No events yet" description="Events will appear here." />}</div></PageContainer>;
}

export function TeamsPage() { const [q,setQ]=useState(''); const filtered=teams.filter((t)=>t.name.toLowerCase().includes(q.toLowerCase())); return <PageContainer title="Teams"><SearchInput placeholder="Search team" value={q} onChange={(e)=>setQ(e.target.value)} /><div className="space-y-3">{filtered.map((t)=><TeamCard key={t.id} team={t} />)}</div></PageContainer>; }

export function TeamDetailsPage() { const {id=''}=useParams(); const team=teamById(id); if(!team) return <PageContainer title="Team"><EmptyState title="Not found" description="No team."/></PageContainer>; const teamPlayers=players.filter((p)=>p.teamId===id); return <PageContainer title={team.name} subtitle={`${team.city} · coach ${team.coach}`}><div className="grid gap-4 md:grid-cols-3"><StatCard label="Position" value={standings.find((s)=>s.teamId===team.id)?.position ?? '-'} /><StatCard label="Points" value={team.stats.points} /><StatCard label="Form" value={team.form.join(' ')} /></div><div><SectionHeader title="Players" /> <div className="space-y-3">{teamPlayers.map((p)=><PlayerCard key={p.id} player={p} teamName={team.shortName} />)}</div></div></PageContainer>; }

export function PlayersPage(){const [team,setTeam]=useState('all'); const filtered=players.filter((p)=>team==='all'||p.teamId===team); return <PageContainer title="Players" action={<Select value={team} onChange={(e)=>setTeam(e.target.value)}><option value="all">All teams</option>{teams.map((t)=><option key={t.id} value={t.id}>{t.shortName}</option>)}</Select>}><div className="space-y-3">{filtered.map((p)=><PlayerCard key={p.id} player={p} teamName={teamById(p.teamId)?.shortName ?? ''} />)}</div></PageContainer>}

export function PlayerDetailsPage(){const {id=''}=useParams(); const p=playerById(id); if(!p) return <PageContainer title="Player"><EmptyState title="Not found" description="No player"/></PageContainer>; return <PageContainer title={p.displayName} subtitle={`${teamById(p.teamId)?.name} · ${p.position}`}><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><StatCard label="Matches" value={p.stats.matches} /><StatCard label="Minutes" value={p.stats.minutes} /><StatCard label="Goals" value={p.stats.goals} /><StatCard label="Assists" value={p.stats.assists} /></div></PageContainer>}

export function EventsPage(){const [type,setType]=useState('all'); const events=allEvents.filter((e)=>type==='all'||e.type===type); return <PageContainer title="Events timeline" action={<Select value={type} onChange={(e)=>setType(e.target.value)}><option value="all">All types</option><option value="goal">Goals</option><option value="yellow_card">Cards</option><option value="substitution">Substitutions</option></Select>}><div className="space-y-2">{events.map((e)=><div key={e.id} className="card text-sm">{e.minute}' · <b>{e.type}</b> · {teamById(e.teamId)?.shortName}</div>)}</div></PageContainer>}

export function SearchPage(){
  const [q,setQ]=useState('');
  const query=q.trim().toLowerCase();
  const result=useMemo(()=>({
    teams:teams.filter((t)=>t.name.toLowerCase().includes(query)),
    players:players.filter((p)=>p.displayName.toLowerCase().includes(query)),
    matches:matches.filter((m)=>teamById(m.homeTeamId)?.name.toLowerCase().includes(query)||teamById(m.awayTeamId)?.name.toLowerCase().includes(query))
  }),[query]);

  return (
    <PageContainer title="Global Search" subtitle="Grouped results with safe spacing for mobile/desktop">
      <SearchInput placeholder="Teams, players, matches" value={q} onChange={(e)=>setQ(e.target.value)} className="h-11" />
      <div className="grid gap-4 md:grid-cols-3">
        <section className="card min-h-40">
          <SectionHeader title="Teams" />
          <div className="space-y-2">{result.teams.map((t)=><Link className="block rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800" key={t.id} to={`/teams/${t.id}`}>{t.name}</Link>) || null}</div>
        </section>
        <section className="card min-h-40">
          <SectionHeader title="Players" />
          <div className="space-y-2">{result.players.map((p)=><Link className="block rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800" key={p.id} to={`/players/${p.id}`}>{p.displayName}</Link>) || null}</div>
        </section>
        <section className="card min-h-40">
          <SectionHeader title="Matches" />
          <div className="space-y-2">{result.matches.map((m)=><Link className="block rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800" key={m.id} to={`/matches/${m.id}`}>{teamById(m.homeTeamId)?.shortName} vs {teamById(m.awayTeamId)?.shortName}</Link>) || null}</div>
        </section>
      </div>
    </PageContainer>
  )
}

export function NotFound(){ return <PageContainer title="Not found"><Link className="btn btn-primary" to="/">Go home</Link></PageContainer>}
