import { useParams } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatch } from '../../hooks/useMatch';

export function AdminMatchCenterPage() {
  const { matchId = '' } = useParams();
  const match = useMatch(matchId);

  if (match.isLoading) return <LoadingState />;
  if (match.error) return <ErrorState message={match.error} />;
  if (!match.data) return <EmptyState title="Match not found" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title={`Match Center · ${match.data.id}`} description="Live event operations skeleton" />
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="text-xs text-zinc-500">Status</p>
        <p className="mt-1 text-sm font-medium">{match.data.status}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['Goal', 'Yellow', 'Red'].map((action) => (
            <button key={action} className="h-10 rounded-lg border border-zinc-300 text-sm">{action}</button>
          ))}
        </div>
        <button className="mt-4 h-10 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white">Finalize match</button>
      </div>
    </div>
  );
}
