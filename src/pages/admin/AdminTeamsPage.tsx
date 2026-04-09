import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useTeams } from '../../hooks/useTeams';

export function AdminTeamsPage() {
  const teams = useTeams();
  if (teams.isLoading) return <LoadingState />;
  if (teams.error) return <ErrorState message={teams.error} />;
  if (!teams.data.length) return <EmptyState title="Команды не добавлены" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Команды" description="Реестр и редактирование" />
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">
        {teams.data.map((team) => (
          <Link key={team.id} to={`/teams/${team.id}`} className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 text-sm last:border-none">
            <span>{team.name}</span>
            <span className="text-zinc-400">Группа {team.group}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
