import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { LoadingState, ErrorState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';

export function AdminDashboardPage() {
  const matches = useMatches();

  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;

  const liveCount = matches.data.filter((item) => item.status === 'live').length;
  const scheduledCount = matches.data.filter((item) => item.status === 'scheduled').length;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Dashboard" description="Today operations snapshot" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Metric title="Live matches" value={liveCount} />
        <Metric title="Scheduled" value={scheduledCount} />
        <Metric title="Total" value={matches.data.length} />
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <p className="text-xs text-zinc-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
