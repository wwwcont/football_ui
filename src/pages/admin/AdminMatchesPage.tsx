import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';

export function AdminMatchesPage() {
  const matches = useMatches();
  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;
  if (!matches.data.length) return <EmptyState title="No matches" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Matches" description="Open match center and monitor statuses" />
      <div className="space-y-2">
        {matches.data.map((match) => (
          <Link key={match.id} to={`/admin/matches/${match.id}/center`} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm">
            <span>{match.id} · Round {match.round}</span>
            <span className="text-zinc-500">{match.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
