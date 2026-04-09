import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useTeams } from '../../hooks/useTeams';

export function AdminTeamsPage() {
  const teams = useTeams();
  if (teams.isLoading) return <LoadingState />;
  if (teams.error) return <ErrorState message={teams.error} />;
  if (!teams.data.length) return <EmptyState title="No teams" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Teams" description="Registry and edit access" />
      <div className="rounded-xl border border-zinc-200 bg-white">
        {teams.data.map((team) => (
          <Link key={team.id} to={`/teams/${team.id}`} className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 text-sm last:border-none">
            <span>{team.name}</span>
            <span className="text-zinc-500">{team.group}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
