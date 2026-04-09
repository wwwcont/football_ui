import { Link } from 'react-router-dom';
import { MatchCard } from '../../components/public/MatchCard';
import { TeamLogo } from '../../components/public/TeamLogo';
import { Section } from '../../components/ui/Section';
import { ErrorState, EmptyState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';
import { TOURNAMENT_LOGO_URL } from '../../lib/teamLogo';

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

  const priorityMatches = [...liveMatches, ...upcomingMatches].slice(0, 4);
  const topTeams = standings.data.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-zinc-900 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">Турнир</p>
            <h1 className="mt-1 text-lg font-semibold text-zinc-100">Футбольная лига 2026</h1>
            <p className="mt-1 text-xs text-zinc-300">Все ключевые матчи, форма лидеров и турнирный пульс — в одном экране.</p>
          </div>
          <img src={TOURNAMENT_LOGO_URL} alt="Логотип турнира" className="h-16 w-16 rounded-xl bg-black/20 p-1" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['Команд', teams.data.length],
            ['Матчей', matches.data.length],
            ['Live', liveMatches.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-black/20 p-2.5">
              <p className="text-[11px] text-zinc-300">{label}</p>
              <p className="mt-1 text-base font-semibold tabular-nums text-zinc-100">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        title="Live / Скоро"
        aside={<Link to="/matches" className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs text-zinc-100">Все матчи</Link>}
      >
        {priorityMatches.length ? (
          <div className="space-y-2.5">
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

      <Section title="Топ-3 команды" aside={<Link to="/teams" className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs uppercase text-zinc-100">Все команды</Link>}>
        <div className="overflow-hidden rounded-xl bg-zinc-900">
          {topTeams.map((entry) => {
            const team = teams.data.find((item) => item.id === entry.teamId);
            return (
              <div key={entry.teamId} className="flex items-center justify-between px-3 py-2.5 last:border-none">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-[11px] text-zinc-100">{entry.position}</span>
                  <TeamLogo team={team} className="h-6 w-6 rounded-full object-cover" />
                  <div>
                    <p className="text-sm text-zinc-100">{team?.name}</p>
                    <p className="text-[11px] text-zinc-500">{team?.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums text-zinc-100">{entry.points}</p>
                  <p className="text-[11px] text-zinc-500">очков</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
