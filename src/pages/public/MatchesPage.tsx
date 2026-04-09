import { MatchCard } from '../../components/public/MatchCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { useTeams } from '../../hooks/useTeams';

export function MatchesPage() {
  const matches = useMatches();
  const teams = useTeams();

  if (matches.isLoading || teams.isLoading) return <LoadingState />;
  if (matches.error || teams.error) return <ErrorState message={matches.error ?? teams.error ?? undefined} />;
  if (!matches.data.length) return <EmptyState title="Матчи еще не добавлены" />;

  const sorted = [...matches.data].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between border-b line-accent pb-2">
        <h1 className="section-title">Расписание матчей</h1>
        <p className="text-xs text-zinc-500">{sorted.length} игр</p>
      </header>
      <div className="space-y-3">
        {sorted.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            homeTeam={teams.data.find((team) => team.id === match.homeTeamId)}
            awayTeam={teams.data.find((team) => team.id === match.awayTeamId)}
          />
        ))}
      </div>
    </section>
  );
}
