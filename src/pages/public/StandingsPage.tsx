import { useMemo, useState } from 'react';
import { TeamLogo } from '../../components/public/TeamLogo';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';
import { getStandingsViewSettings, type StandingsViewMode } from '../../lib/standingsViewSettings';

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
  const [viewMode, setViewMode] = useState<StandingsViewMode>(() => getStandingsViewSettings().defaultView);
  const settings = useMemo(() => getStandingsViewSettings(), []);

  if (standings.isLoading || teams.isLoading) return <LoadingState />;
  if (standings.error || teams.error) return <ErrorState message={standings.error ?? teams.error ?? undefined} />;

  const rows = standings.data.map((row) => ({
    row,
    team: teams.data.find((item) => item.id === row.teamId),
  }));

  const gridRowCount = Math.ceil(rows.length / settings.gridColumns);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-2">
        <p className="px-2 text-xs text-zinc-400">Режим отображения</p>
        <div className="flex rounded-lg bg-black/25 p-1">
          <ViewButton current={viewMode} target="table" onClick={setViewMode} label="Таблица" />
          <ViewButton current={viewMode} target="grid" onClick={setViewMode} label="Сетка" />
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-hidden rounded-xl bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="text-zinc-400">
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
                {rows.map(({ row, team }) => (
                  <tr key={row.teamId}>
                    <td className="px-2 py-2 tabular-nums text-zinc-300">{row.position}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <TeamLogo team={team} className="h-5 w-5 rounded-full object-cover" />
                        <span className="whitespace-nowrap text-zinc-100">{team?.shortName ?? team?.name}</span>
                      </div>
                    </td>
                    <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300">{row.played}</td>
                    <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300">{row.won}-{row.drawn}-{row.lost}</td>
                    <td className="px-1.5 py-2 text-right tabular-nums text-zinc-300"><GoalLine gf={row.gf} ga={row.ga} gd={row.gd} /></td>
                    <td className="px-2 py-2 text-right font-semibold tabular-nums text-zinc-100">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          className="grid gap-2"
          style={{
            gridAutoFlow: 'column',
            gridTemplateRows: `repeat(${gridRowCount}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${settings.gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {rows.map(({ row, team }) => (
            <article key={row.teamId} className="rounded-xl bg-zinc-900 p-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs tabular-nums text-zinc-200">
                  {row.position}
                </span>
                <TeamLogo team={team} className="h-7 w-7 rounded-full object-cover" />
                <p className="truncate text-sm font-medium text-zinc-100">{team?.name}</p>
              </div>
              <div className="mt-2 text-xs text-zinc-400">
                <p>{row.won}-{row.drawn}-{row.lost}</p>
                <p className="tabular-nums">Очки: <span className="text-zinc-100">{row.points}</span></p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ViewButton({
  current,
  target,
  onClick,
  label,
}: {
  current: StandingsViewMode;
  target: StandingsViewMode;
  onClick: (mode: StandingsViewMode) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={current === target ? 'rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-100' : 'rounded-md px-3 py-1.5 text-xs text-zinc-400'}
      onClick={() => onClick(target)}
    >
      {label}
    </button>
  );
}
