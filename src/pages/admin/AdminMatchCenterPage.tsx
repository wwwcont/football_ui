import { useParams } from 'react-router-dom';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatch } from '../../hooks/useMatch';
import { statusLabel } from '../../lib/format';

export function AdminMatchCenterPage() {
  const { matchId = '' } = useParams();
  const match = useMatch(matchId);

  if (match.isLoading) return <LoadingState />;
  if (match.error) return <ErrorState message={match.error} />;
  if (!match.data) return <EmptyState title="Матч не найден" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title={`Матч-центр · ${match.data.id}`} description="Операционный экран ведения матча" />
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-xs text-zinc-500">Статус</p>
        <p className="mt-1 text-sm font-medium">{statusLabel[match.data.status]}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['Гол', 'ЖК', 'КК'].map((action) => (
            <button key={action} className="h-10 rounded-lg border border-zinc-700 text-sm">{action}</button>
          ))}
        </div>
        <button className="mt-4 h-10 w-full rounded-lg bg-white text-sm font-medium text-zinc-900">Завершить матч</button>
      </div>
    </div>
  );
}
