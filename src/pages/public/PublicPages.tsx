import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarDays, MapPin, Shield } from 'lucide-react';
import { allEvents, matches, players, standings, teams } from '../../data/mockData';
import { MatchCard, PlayerCard, TeamCard } from '../../components/cards/Cards';
import { Button, SearchInput, Select } from '../../components/ui/FormControls';
import { EmptyState, PageContainer, SectionHeader, StatCard, StatusBadge } from '../../components/ui/Primitives';
import { matchById, playerById, teamById } from '../../utils/selectors';

const formatStatus = (status: string) => ({ upcoming: 'Скоро', live: 'Идет', finished: 'Завершен', postponed: 'Перенесен', cancelled: 'Отменен' }[status] ?? status);
const formatEventType = (type: string) => ({ goal: 'Гол', yellow_card: 'Желтая карточка', red_card: 'Красная карточка', substitution: 'Замена', own_goal: 'Автогол', penalty: 'Пенальти', admin: 'Событие' }[type] ?? type);
const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const recentMatchesForTeam = (teamId: string, currentMatchId: string) =>
  matches
    .filter((m) => m.id !== currentMatchId && m.status !== 'upcoming' && (m.homeTeamId === teamId || m.awayTeamId === teamId))
    .slice(0, 3);

export function HomePage() {
  return (
    <PageContainer title="Турнирная панель" subtitle="MVP-версия с моковыми данными">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Команд" value={teams.length} />
        <StatCard label="Игроков" value={players.length} />
        <StatCard label="Матчей" value={matches.length} />
        <StatCard label="Событий" value={allEvents.length} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section>
          <SectionHeader title="Сегодня / скоро" />
          <div className="space-y-3">
            {matches.slice(0, 3).map((m) => <MatchCard key={m.id} match={m} home={teamById(m.homeTeamId)!} away={teamById(m.awayTeamId)!} />)}
          </div>
        </section>

        <section>
          <SectionHeader title="Топ команд" right={<Link to="/teams" className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">Посмотреть все</Link>} />
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
      title="Турнирная таблица"
      action={<Select value={group} onChange={(e) => setGroup(e.target.value)}><option value="all">Все группы</option><option value="A">Группа A</option><option value="B">Группа B</option></Select>}
    >
      <div className="card overflow-hidden border-zinc-800 bg-[#001745] p-0 text-white">
        <table className="w-full text-sm">
          <thead className="bg-[#00225f] text-zinc-100">
            <tr>{['#', 'Команда', 'И', 'В-Н-П', 'ЗП', 'О'].map((h) => <th key={h} className="px-2 py-3 text-left md:px-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const team = teamById(r.teamId);
              return (
                <tr key={r.teamId} className="border-t border-blue-950/80">
                  <td className="px-2 py-3 md:px-3">{r.position}</td>
                  <td className="px-2 py-3 md:px-3">
                    <div className="flex items-center gap-2">
                      <img src={team?.logoUrl} className="h-8 w-8 rounded-md object-cover" />
                      <span className="font-semibold">{team?.shortName}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 md:px-3">{r.played}</td>
                  <td className="px-2 py-3 md:px-3">{`${r.won}-${r.drawn}-${r.lost}`}</td>
                  <td className="px-2 py-3 md:px-3">
                    <span className="font-semibold">{r.gf}-{r.ga}</span>
                    <sup className="ml-1 text-[10px] font-semibold">{r.gd > 0 ? `+${r.gd}` : r.gd}</sup>
                  </td>
                  <td className="px-2 py-3 font-semibold md:px-3">{r.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}

export function MatchesPage() {
  const [status, setStatus] = useState('all');
  const filtered = matches.filter((m) => status === 'all' || m.status === status);
  return <PageContainer title="Матчи" action={<Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Все статусы</option><option value="upcoming">Скоро</option><option value="live">Идут</option><option value="finished">Завершены</option></Select>}><div className="space-y-3">{filtered.map((m) => <MatchCard key={m.id} match={m} home={teamById(m.homeTeamId)!} away={teamById(m.awayTeamId)!} />)}</div></PageContainer>;
}

export function MatchDetailsPage() {
  const { id = '' } = useParams();
  const match = matchById(id);
  if (!match) return <PageContainer title="Матч"><EmptyState title="Матч не найден" description="Проверьте ссылку." /></PageContainer>;

  const home = teamById(match.homeTeamId);
  const away = teamById(match.awayTeamId);
  const homeRecent = recentMatchesForTeam(match.homeTeamId, match.id);
  const awayRecent = recentMatchesForTeam(match.awayTeamId, match.id);

  return (
    <PageContainer title="Превью матча" subtitle="Инфо, форма команд и судейская бригада">
      <section className="overflow-hidden rounded-2xl border border-blue-900 bg-gradient-to-b from-[#12357f] to-[#0b1f57] text-white shadow-soft">
        <div className="flex items-center justify-center gap-3 border-b border-blue-400/30 px-4 py-3 text-sm md:text-base">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(match.date)}</span>
          <span className="opacity-80">|</span>
          <span>{match.time}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-6 md:px-8 md:py-8">
          <div className="text-center">
            <img src={home?.logoUrl} className="mx-auto h-20 w-20 rounded-xl object-cover md:h-24 md:w-24" />
            <p className="mt-2 text-2xl font-extrabold md:text-4xl">{home?.shortName}</p>
          </div>
          <p className="px-2 text-4xl font-black md:text-6xl">{match.homeScore ?? '-'}:{match.awayScore ?? '-'}</p>
          <div className="text-center">
            <img src={away?.logoUrl} className="mx-auto h-20 w-20 rounded-xl object-cover md:h-24 md:w-24" />
            <p className="mt-2 text-2xl font-extrabold md:text-4xl">{away?.shortName}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-blue-400/30 px-4 py-4 text-lg font-medium">
          <MapPin className="h-5 w-5" />
          {match.venue}
        </div>
      </section>

      <section className="card">
        <SectionHeader title="Инфо" />
        <div className="grid gap-2 text-sm md:grid-cols-2">
          <p><b>Статус:</b> {formatStatus(match.status)}</p>
          <p><b>Судьи:</b> {match.referees.join(', ') || '—'}</p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card">
          <SectionHeader title={`Последние матчи · ${home?.shortName}`} right={<Shield className="h-4 w-4 text-zinc-400" />} />
          <div className="space-y-2">
            {homeRecent.length ? homeRecent.map((m) => (
              <Link key={m.id} to={`/matches/${m.id}`} className="block rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                {teamById(m.homeTeamId)?.shortName} {m.homeScore ?? '-'}:{m.awayScore ?? '-'} {teamById(m.awayTeamId)?.shortName}
              </Link>
            )) : <p className="text-sm text-zinc-500">Нет завершенных матчей.</p>}
          </div>
        </section>

        <section className="card">
          <SectionHeader title={`Последние матчи · ${away?.shortName}`} right={<Shield className="h-4 w-4 text-zinc-400" />} />
          <div className="space-y-2">
            {awayRecent.length ? awayRecent.map((m) => (
              <Link key={m.id} to={`/matches/${m.id}`} className="block rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                {teamById(m.homeTeamId)?.shortName} {m.homeScore ?? '-'}:{m.awayScore ?? '-'} {teamById(m.awayTeamId)?.shortName}
              </Link>
            )) : <p className="text-sm text-zinc-500">Нет завершенных матчей.</p>}
          </div>
        </section>
      </div>

      <section>
        <SectionHeader title="События матча" />
        {match.events.length ? <div className="space-y-2">{match.events.map((e) => <div key={e.id} className="card text-sm">{e.minute}' · {formatEventType(e.type)} · {playerById(e.playerId || '')?.displayName ?? 'Командное событие'}</div>)}</div> : <EmptyState title="Пока без событий" description="События появятся во время матча." />}
      </section>
    </PageContainer>
  );
}

export function TeamsPage() { const [q, setQ] = useState(''); const filtered = teams.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())); return <PageContainer title="Команды"><SearchInput placeholder="Поиск команды" value={q} onChange={(e) => setQ(e.target.value)} /><div className="space-y-3">{filtered.map((t) => <TeamCard key={t.id} team={t} />)}</div></PageContainer>; }

export function TeamDetailsPage() { const { id = '' } = useParams(); const team = teamById(id); if (!team) return <PageContainer title="Команда"><EmptyState title="Не найдено" description="Такой команды нет." /></PageContainer>; const teamPlayers = players.filter((p) => p.teamId === id); return <PageContainer title={team.name} subtitle={`${team.city} · тренер ${team.coach}`}><div className="grid gap-4 md:grid-cols-3"><StatCard label="Позиция" value={standings.find((s) => s.teamId === team.id)?.position ?? '-'} /><StatCard label="Очки" value={team.stats.points} /><StatCard label="Форма" value={team.form.join(' ')} /></div><div><SectionHeader title="Игроки" /> <div className="space-y-3">{teamPlayers.map((p) => <PlayerCard key={p.id} player={p} teamName={team.shortName} />)}</div></div></PageContainer>; }

export function PlayersPage() { const [team, setTeam] = useState('all'); const filtered = players.filter((p) => team === 'all' || p.teamId === team); return <PageContainer title="Игроки" action={<Select value={team} onChange={(e) => setTeam(e.target.value)}><option value="all">Все команды</option>{teams.map((t) => <option key={t.id} value={t.id}>{t.shortName}</option>)}</Select>}><div className="space-y-3">{filtered.map((p) => <PlayerCard key={p.id} player={p} teamName={teamById(p.teamId)?.shortName ?? ''} />)}</div></PageContainer>; }

export function PlayerDetailsPage() { const { id = '' } = useParams(); const p = playerById(id); if (!p) return <PageContainer title="Игрок"><EmptyState title="Не найдено" description="Игрок не найден" /></PageContainer>; return <PageContainer title={p.displayName} subtitle={`${teamById(p.teamId)?.name} · ${p.position}`}><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><StatCard label="Матчи" value={p.stats.matches} /><StatCard label="Минуты" value={p.stats.minutes} /><StatCard label="Голы" value={p.stats.goals} /><StatCard label="Передачи" value={p.stats.assists} /></div></PageContainer>; }

export function EventsPage() { const [type, setType] = useState('all'); const events = allEvents.filter((e) => type === 'all' || e.type === type); return <PageContainer title="Лента событий" action={<Select value={type} onChange={(e) => setType(e.target.value)}><option value="all">Все типы</option><option value="goal">Голы</option><option value="yellow_card">Желтые карточки</option><option value="substitution">Замены</option></Select>}><div className="space-y-2">{events.map((e) => <div key={e.id} className="card text-sm">{e.minute}' · <b>{formatEventType(e.type)}</b> · {teamById(e.teamId)?.shortName}</div>)}</div></PageContainer>; }

export function SearchPage() {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const hasQuery = query.length > 0;

  const result = useMemo(() => ({
    teams: teams.filter((t) => t.name.toLowerCase().includes(query) || t.city.toLowerCase().includes(query) || t.shortName.toLowerCase().includes(query)),
    players: players.filter((p) => p.displayName.toLowerCase().includes(query) || p.position.toLowerCase().includes(query)),
    matches: matches.filter((m) => `${teamById(m.homeTeamId)?.name} ${teamById(m.awayTeamId)?.name} ${m.venue}`.toLowerCase().includes(query)),
    events: allEvents.filter((e) => formatEventType(e.type).toLowerCase().includes(query) || (e.note ?? '').toLowerCase().includes(query)),
  }), [query]);

  const total = result.teams.length + result.players.length + result.matches.length + result.events.length;

  return (
    <PageContainer title="Поиск" subtitle="Сначала общий поиск по всем материалам, ниже — переход к разделам">
      <div className="card">
        <SearchInput placeholder="Команды, игроки, матчи, события" value={q} onChange={(e) => setQ(e.target.value)} className="h-11" />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {hasQuery ? `Найдено результатов: ${total}` : 'Введите запрос, чтобы искать сразу по всем данным.'}
        </p>
        {hasQuery && (
          <div className="mt-3 space-y-2 text-sm">
            {result.teams.slice(0, 3).map((t) => <Link key={t.id} to={`/teams/${t.id}`} className="block rounded-xl border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Команда: {t.name}</Link>)}
            {result.players.slice(0, 3).map((p) => <Link key={p.id} to={`/players/${p.id}`} className="block rounded-xl border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Игрок: {p.displayName}</Link>)}
            {result.matches.slice(0, 3).map((m) => <Link key={m.id} to={`/matches/${m.id}`} className="block rounded-xl border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Матч: {teamById(m.homeTeamId)?.shortName} vs {teamById(m.awayTeamId)?.shortName}</Link>)}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <section className="card min-h-36">
          <SectionHeader title="Игроки" />
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Поиск и фильтрация игроков в отдельном разделе.</p>
          <Link to="/players"><Button className="w-full">Искать игроков</Button></Link>
        </section>
        <section className="card min-h-36">
          <SectionHeader title="Команды" />
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Переход к поиску и карточкам команд.</p>
          <Link to="/teams"><Button className="w-full">Искать команды</Button></Link>
        </section>
        <section className="card min-h-36">
          <SectionHeader title="Матчи" />
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Список матчей со статусами и деталями.</p>
          <Link to="/matches"><Button className="w-full">Искать матчи</Button></Link>
        </section>
      </div>
    </PageContainer>
  );
}

export function NotFound() { return <PageContainer title="Страница не найдена"><Link className="btn btn-primary" to="/">На главную</Link></PageContainer>; }
