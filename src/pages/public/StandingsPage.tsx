import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';

export function StandingsPage() {
  const standings = useStandings();
  const teams = useTeams();

  if (standings.isLoading || teams.isLoading) return <LoadingState />;
  if (standings.error || teams.error) return <ErrorState message={standings.error ?? teams.error ?? undefined} />;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Team</th>
            <th className="px-3 py-2 text-right">P</th>
            <th className="px-3 py-2 text-right">GD</th>
            <th className="px-3 py-2 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.data.map((row) => (
            <tr key={row.teamId} className="border-t border-zinc-100">
              <td className="px-3 py-2">{row.position}</td>
              <td className="px-3 py-2">{teams.data.find((item) => item.id === row.teamId)?.name}</td>
              <td className="px-3 py-2 text-right tabular-nums">{row.played}</td>
              <td className="px-3 py-2 text-right tabular-nums">{row.gd}</td>
              <td className="px-3 py-2 text-right font-semibold tabular-nums">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
