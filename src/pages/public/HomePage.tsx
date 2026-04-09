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
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border border-[#6d2432]/70 bg-gradient-to-br from-[#451621] via-zinc-900 to-zinc-900 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-rose-200/80">Турнир</p>
            <h1 className="mt-1 text-lg font-semibold text-zinc-100">Футбольная лига 2026</h1>
            <p className="mt-1 text-xs text-zinc-300">Все ключевые матчи, форма лидеров и турнирный пульс — в одном экране.</p>
          </div>
          <img src={TOURNAMENT_LOGO_URL} alt="Логотип турнира" className="h-16 w-16 rounded-xl border border-rose-300/30 bg-black/20 p-2" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['Команд', teams.data.length],
            ['Матчей', matches.data.length],
            ['Live', liveMatches.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-rose-300/20 bg-black/20 p-2.5">
              <p className="text-[11px] text-zinc-300">{label}</p>
              <p className="mt-1 text-base font-semibold tabular-nums text-rose-100">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        title="Live / Скоро"
        aside={<Link to="/matches" className="rounded-full border border-[#6d2432]/60 px-2.5 py-1 text-xs text-rose-100">Все матчи</Link>}
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

      <Section title="Топ-3 команды" aside={<Link to="/table" className="text-xs text-zinc-400">Таблица</Link>}>
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          {topTeams.map((entry) => {
            const team = teams.data.find((item) => item.id === entry.teamId);
            return (
              <div key={entry.teamId} className="flex items-center justify-between border-b border-zinc-800 px-3 py-2.5 last:border-none">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#40141d] text-[11px] text-rose-100">{entry.position}</span>
                  <TeamLogo team={team} className="h-6 w-6 rounded-full border border-zinc-700 object-cover" />
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
