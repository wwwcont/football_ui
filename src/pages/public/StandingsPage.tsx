import { TeamLogo } from '../../components/public/TeamLogo';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';

function GoalLine({ gf, ga, gd }: { gf: number; ga: number; gd: number }) {
  const diff = gd > 0 ? `+${gd}` : `${gd}`;

  return (
    <span className="inline-flex items-start gap-0.5">
      <span>{gf}-{ga}</span>
      <sup className="text-[10px] leading-none text-zinc-500">{diff}</sup>
    </span>
  );
}

export function StandingsPage() {
  const standings = useStandings();
  const teams = useTeams();

  if (standings.isLoading || teams.isLoading) return <LoadingState />;
  if (standings.error || teams.error) return <ErrorState message={standings.error ?? teams.error ?? undefined} />;

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="px-2 py-2 text-left font-medium">#</th>
              <th className="px-2 py-2 text-left font-medium">Команда</th>
              <th className="px-1.5 py-2 text-right font-medium">И</th>
              <th className="px-1.5 py-2 text-right font-medium">В-Н-П</th>
              <th className="px-1.5 py-2 text-right font-medium">Мячи</th>
              <th className="px-2 py-2 text-right font-medium">О</th>
            </tr>
          </thead>
          <tbody>
            {standings.data.map((row) => {
              const team = teams.data.find((item) => item.id === row.teamId);
              return (
                <tr key={row.teamId} className="border-t border-zinc-800">
                  <td className="px-2 py-2 tabular-nums text-zinc-300">{row.position}</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <TeamLogo team={team} className="h-5 w-5 rounded-full border border-zinc-700 object-cover" />
                      <span className="whitespace-nowrap text-zinc-100">{team?.shortName ?? team?.name}</span>
                    </div>
                  </td>
                  <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300">{row.played}</td>
                  <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300">{row.won}-{row.drawn}-{row.lost}</td>
                  <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300"><GoalLine gf={row.gf} ga={row.ga} gd={row.gd} /></td>
                  <td className="px-2 py-2 text-right font-semibold tabular-nums text-zinc-100">{row.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
