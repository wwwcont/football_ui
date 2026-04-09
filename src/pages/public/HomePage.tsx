import { Link } from 'react-router-dom';
import { MatchCard } from '../../components/public/MatchCard';
import { Section } from '../../components/ui/Section';
import { ErrorState, EmptyState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';

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
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Турнир</p>
        <h1 className="mt-1 text-lg font-semibold text-zinc-100">Футбольная лига 2026</h1>
        <p className="mt-1 text-xs text-zinc-500">Главный экран: live и ближайшие матчи</p>
      </section>

      <Section title="Live / Скоро" aside={<Link to="/matches" className="text-xs text-zinc-400">Все матчи</Link>}>
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
                  <span className="w-5 text-xs text-zinc-500">{entry.position}</span>
                  <img src={team?.logoUrl} alt={team?.name ?? 'Команда'} className="h-5 w-5 rounded-full border border-zinc-700 object-cover" />
                  <p className="text-sm text-zinc-100">{team?.name}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-zinc-100">{entry.points}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
