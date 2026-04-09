import { Link } from 'react-router-dom';
import { MatchCard } from '../../components/public/MatchCard';
import { Section } from '../../components/ui/Section';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';

export function HomePage() {
  const teams = useTeams();
  const matches = useMatches();
  const standings = useStandings();

  if (teams.isLoading || matches.isLoading || standings.isLoading) return <LoadingState label="Собираем дашборд..." />;
  if (teams.error || matches.error || standings.error) return <ErrorState message={teams.error ?? matches.error ?? standings.error ?? undefined} />;

  const live = matches.data.filter((item) => item.status === 'live');
  const topTeams = standings.data.slice(0, 4);

  return (
    <div className="space-y-6">
      <Section title="Live матчи" aside={<Link to="/matches" className="text-xs text-zinc-400">Все матчи</Link>}>
        <div className="space-y-3">
          {(live.length ? live : matches.data.slice(0, 2)).map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              homeTeam={teams.data.find((team) => team.id === match.homeTeamId)}
              awayTeam={teams.data.find((team) => team.id === match.awayTeamId)}
            />
          ))}
        </div>
      </Section>

      <Section title="Топ таблицы" aside={<Link to="/table" className="text-xs text-zinc-400">Полная таблица</Link>}>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
          {topTeams.map((entry) => {
            const team = teams.data.find((item) => item.id === entry.teamId);
            return (
              <div key={entry.teamId} className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 last:border-none">
                <p className="text-sm text-zinc-100"><span className="mr-2 text-zinc-400">{entry.position}.</span>{team?.name}</p>
                <p className="text-sm font-semibold tabular-nums">{entry.points}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
