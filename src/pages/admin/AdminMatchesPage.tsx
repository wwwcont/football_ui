import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { statusLabel } from '../../lib/format';

export function AdminMatchesPage() {
  const matches = useMatches();
  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;
  if (!matches.data.length) return <EmptyState title="Матчей нет" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Матчи" description="Откройте матч-центр для ведения" />
      <div className="space-y-2">
        {matches.data.map((match) => (
          <Link key={match.id} to={`/admin/matches/${match.id}/center`} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm">
            <span>{match.id} · Тур {match.round}</span>
            <span className="text-zinc-400">{statusLabel[match.status]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
