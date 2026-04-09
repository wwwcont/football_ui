import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatches } from '../../hooks/useMatches';

export function AdminSchedulePage() {
  const matches = useMatches();

  if (matches.isLoading) return <LoadingState />;
  if (matches.error) return <ErrorState message={matches.error} />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Расписание" description="Туры и слоты матчей" />
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="space-y-2 text-sm">
          {matches.data.map((match) => (
            <div key={match.id} className="flex items-center justify-between rounded-lg border border-zinc-800 px-3 py-2">
              <span>Тур {match.round} · {match.id}</span>
              <span className="text-zinc-400">{match.date} {match.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
