import { TeamCard } from '../../components/public/TeamCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useTeams } from '../../hooks/useTeams';

export function TeamsPage() {
  const teams = useTeams();

  if (teams.isLoading) return <LoadingState />;
  if (teams.error) return <ErrorState message={teams.error} />;
  if (!teams.data.length) return <EmptyState title="No teams available" />;

  return <div className="grid gap-3">{teams.data.map((team) => <TeamCard key={team.id} team={team} />)}</div>;
}
