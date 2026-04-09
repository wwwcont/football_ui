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

  return (
    <div className="space-y-3">
      {matches.data.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          homeTeam={teams.data.find((team) => team.id === match.homeTeamId)}
          awayTeam={teams.data.find((team) => team.id === match.awayTeamId)}
        />
      ))}
    </div>
  );
}
