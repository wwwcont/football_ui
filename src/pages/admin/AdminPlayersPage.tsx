import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { usePlayers } from '../../hooks/usePlayers';

export function AdminPlayersPage() {
  const players = usePlayers();
  if (players.isLoading) return <LoadingState />;
  if (players.error) return <ErrorState message={players.error} />;
  if (!players.data.length) return <EmptyState title="No players" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Players" description="Roster registry" />
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500"><tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-right">Pos</th><th className="px-3 py-2 text-right">Goals</th></tr></thead>
          <tbody>
            {players.data.map((player) => (
              <tr key={player.id} className="border-t border-zinc-100"><td className="px-3 py-2">{player.displayName}</td><td className="px-3 py-2 text-right">{player.position}</td><td className="px-3 py-2 text-right tabular-nums">{player.stats.goals}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
