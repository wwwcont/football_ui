import { Link } from 'react-router-dom';
import { MatchCard } from '../../components/public/MatchCard';
import { TeamLogo } from '../../components/public/TeamLogo';
import { Section } from '../../components/ui/Section';
import { ErrorState, EmptyState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';
import { APP_LOGO_URL } from '../../lib/logoAsset';

export function HomePage() {
  const teams = useTeams();
  const matches = useMatches();
  const standings = useStandings();

  if (teams.isLoading || matches.isLoading || standings.isLoading) {
    return <LoadingState label="Загружаем данные турнира..." />;
  }

  if (teams.error || matches.error || standings.error) {
    return <ErrorState message={teams.error ?? matches.error ?? standings.error ?? undefined} />;
  }

  const liveMatches = matches.data.filter((item) => item.status === 'live');
  const upcomingMatches = matches.data
    .filter((item) => item.status === 'scheduled')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const priorityMatches = [...liveMatches, ...upcomingMatches].slice(0, 5);
  const topTeams = standings.data.slice(0, 3);
  const featuredMatch = priorityMatches[0];

  return (
    <div className="space-y-6">
      <section className="panel-matte relative overflow-hidden rounded-3xl p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <span className="absolute left-0 right-0 top-16 h-px accent-line" />
          <span className="absolute bottom-16 left-0 right-0 h-px accent-line" />
          <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 accent-line" />
        </div>

        <div className="relative grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Football Tournament Hub</p>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-zinc-100 md:text-3xl">Футбольная лига 2026</h1>
            <p className="mt-2 max-w-lg text-sm text-zinc-300">Матч-центр турнира: live-игры, турнирная таблица, форма команд и быстрый переход к деталям каждого тура.</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Команд', teams.data.length],
                ['Матчей', matches.data.length],
                ['Live', liveMatches.length],
              ].map(([label, value]) => (
                <div key={label} className="panel-soft rounded-xl px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
                  <p className="mt-1 text-lg font-bold tabular-nums text-zinc-100">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-soft relative mx-auto w-full max-w-[240px] rounded-2xl p-4 text-center md:mx-0 md:ml-auto">
            <img src={APP_LOGO_URL} alt="Tournament logo" className="mx-auto h-20 w-20 rounded-2xl border border-zinc-700/70 bg-zinc-950 p-2" />
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-zinc-500">season spotlight</p>
            <p className="mt-1 text-sm font-semibold text-zinc-100">Premium Matchday Center</p>
          </div>
        </div>
      </section>

      {featuredMatch ? (
        <section className="panel-soft rounded-2xl p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="section-title">Центральный матч</h2>
            <Link to={`/matches/${featuredMatch.id}`} className="accent-badge rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.11em]">Перейти</Link>
          </div>
          <MatchCard
            match={featuredMatch}
            homeTeam={teams.data.find((team) => team.id === featuredMatch.homeTeamId)}
            awayTeam={teams.data.find((team) => team.id === featuredMatch.awayTeamId)}
          />
        </section>
      ) : null}

      <Section
        title="Live / Скоро"
        aside={<Link to="/matches" className="panel-soft rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-200">Все матчи</Link>}
      >
        {priorityMatches.length ? (
          <div className="space-y-3">
            {priorityMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                homeTeam={teams.data.find((team) => team.id === match.homeTeamId)}
                awayTeam={teams.data.find((team) => team.id === match.awayTeamId)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Скоро появятся новые матчи" />
        )}
      </Section>

      <Section title="Топ-3 команды" aside={<Link to="/teams" className="panel-soft rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-200">Все команды</Link>}>
        <div className="panel-matte overflow-hidden rounded-2xl">
          {topTeams.map((entry) => {
            const team = teams.data.find((item) => item.id === entry.teamId);
            return (
              <div key={entry.teamId} className="flex items-center justify-between border-b line-accent px-3.5 py-3 last:border-none">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border line-accent text-xs font-semibold text-zinc-100">{entry.position}</span>
                  <TeamLogo team={team} className="h-8 w-8" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{team?.name}</p>
                    <p className="text-[11px] text-zinc-500">Форма: {team?.form?.slice(0, 3).join(' ') || '—'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold tabular-nums text-zinc-100">{entry.points}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">очков</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
