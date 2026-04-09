import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';

export function StandingsPage() {
  const standings = useStandings();
  const teams = useTeams();

  if (standings.isLoading || teams.isLoading) return <LoadingState />;
  if (standings.error || teams.error) return <ErrorState message={standings.error ?? teams.error ?? undefined} />;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-950 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Команда</th>
            <th className="px-2 py-2 text-right">В</th>
            <th className="px-2 py-2 text-right">Н</th>
            <th className="px-2 py-2 text-right">П</th>
            <th className="px-3 py-2 text-right">Мячи</th>
            <th className="px-3 py-2 text-right">О</th>
          </tr>
        </thead>
        <tbody>
          {standings.data.map((row) => (
            <tr key={row.teamId} className="border-t border-zinc-800">
              <td className="px-3 py-2">{row.position}</td>
              <td className="px-3 py-2">{teams.data.find((item) => item.id === row.teamId)?.name}</td>
              <td className="px-2 py-2 text-right tabular-nums">{row.won}</td>
              <td className="px-2 py-2 text-right tabular-nums">{row.drawn}</td>
              <td className="px-2 py-2 text-right tabular-nums">{row.lost}</td>
              <td className="px-3 py-2 text-right tabular-nums">{row.gf}:{row.ga}</td>
              <td className="px-3 py-2 text-right font-semibold tabular-nums">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
