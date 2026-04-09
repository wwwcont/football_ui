import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';
import { statusLabel } from '../../lib/format';
import { mockRepository } from '../../repositories/mockRepository';
import type { MatchStatus } from '../../domain/models';

const statuses: MatchStatus[] = ['scheduled', 'live', 'finished', 'postponed', 'canceled'];

export function AdminMatchesPage() {
  const matches = useMatches();
  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;
  if (!matches.data.length) return <EmptyState title="Матчей нет" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Матчи" description="Меняйте статус и открывайте матч-центр" />
      <div className="space-y-2">
        {matches.data.map((match) => (
          <div key={match.id} className="flex flex-col gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
            <Link to={`/admin/matches/${match.id}/center`} className="text-rose-200">{match.id} · Тур {match.round}</Link>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">{statusLabel[match.status]}</span>
              <select defaultValue={match.status} onChange={(e) => { void mockRepository.setMatchStatus(match.id, e.target.value as MatchStatus); }} className="h-9 rounded-lg bg-zinc-800 px-2">
                {statuses.map((status) => <option value={status} key={status}>{statusLabel[status]}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
