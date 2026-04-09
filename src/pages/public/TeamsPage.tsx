import { TeamCard } from '../../components/public/TeamCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useTeams } from '../../hooks/useTeams';

export function TeamsPage() {
  const teams = useTeams();

  if (teams.isLoading) return <LoadingState />;
  if (teams.error) return <ErrorState message={teams.error} />;
  if (!teams.data.length) return <EmptyState title="Список команд пуст" />;

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between border-b line-accent pb-2">
        <h1 className="section-title">Команды турнира</h1>
        <p className="text-xs text-zinc-500">{teams.data.length}</p>
      </header>
      <div className="grid gap-3">{teams.data.map((team) => <TeamCard key={team.id} team={team} />)}</div>
    </section>
  );
}
