import { useState } from 'react';
import { TeamLogo } from '../../components/public/TeamLogo';
import { ErrorState, LoadingState } from '../../components/ui/PageState';
import { useStandings } from '../../hooks/useStandings';
import { useTeams } from '../../hooks/useTeams';
import { getStandingsViewSettings, type StandingsViewMode } from '../../lib/standingsViewSettings';
import type { Team } from '../../domain/models';

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

  if (standings.isLoading || teams.isLoading) return <LoadingState />;
  if (standings.error || teams.error) return <ErrorState message={standings.error ?? teams.error ?? undefined} />;

  const rows = standings.data.map((row) => ({
    row,
    team: teams.data.find((item) => item.id === row.teamId),
  }));
  const bracketRounds = buildBracketRounds(rows.map((item) => item.team).filter(Boolean) as Team[]);

  return (
    <section className="space-y-3">
      <div className="panel-matte flex items-center justify-between rounded-xl p-2">
        <p className="px-2 text-xs text-zinc-400">Режим отображения</p>
        <div className="panel-soft flex rounded-lg p-1">
          <ViewButton current={viewMode} target="table" onClick={setViewMode} label="Таблица" />
          <ViewButton current={viewMode} target="grid" onClick={setViewMode} label="Сетка" />
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="panel-matte overflow-hidden rounded-xl">
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
        <div className="panel-matte rounded-xl p-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {bracketRounds.map((round, roundIndex) => (
              <div key={round.title} className="relative flex-1">
                <p className="mb-2 text-center text-[11px] uppercase tracking-wide text-[#d8bd75]">{round.title}</p>
                <div className="space-y-3">
                  {round.matches.map((match, matchIndex) => (
                    <BracketMatchCard
                      key={`${round.title}-${matchIndex}`}
                      match={match}
                      isLastRound={roundIndex === bracketRounds.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

type BracketSlot = {
  team?: Team;
  placeholder?: '?' | 'BYE';
};

type BracketMatch = {
  home: BracketSlot;
  away: BracketSlot;
};

function buildBracketRounds(sortedTeams: Team[]) {
  const teams: Array<Team | undefined> = [...sortedTeams];
  if (teams.length % 2 !== 0) {
    teams.push(undefined);
  }

  const rounds: Array<{ title: string; matches: BracketMatch[] }> = [];
  const firstRound: BracketMatch[] = [];

  for (let index = 0; index < teams.length; index += 2) {
    firstRound.push({
      home: teams[index] ? { team: teams[index] } : { placeholder: '?' },
      away: teams[index + 1] ? { team: teams[index + 1] } : { placeholder: '?' },
    });
  }

  rounds.push({ title: 'Раунд 1', matches: firstRound });

  let matchesInRound = firstRound.length;
  while (matchesInRound > 1) {
    matchesInRound = Math.ceil(matchesInRound / 2);
    rounds.push({
      title: matchesInRound === 1 ? 'Финал' : matchesInRound === 2 ? '1/2 финала' : '1/4 финала',
      matches: Array.from({ length: matchesInRound }, () => ({
        home: { placeholder: '?' },
        away: { placeholder: '?' },
      })),
    });
  }

  return rounds;
}

function BracketMatchCard({ match, isLastRound }: { match: BracketMatch; isLastRound: boolean }) {
  return (
    <article className="relative rounded-lg border line-accent px-2 py-2">
      <div className="space-y-1.5">
        <TeamSlot slot={match.home} />
        <TeamSlot slot={match.away} />
      </div>

      {!isLastRound ? (
        <>
          <span className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 bg-[#8f7a3f] lg:hidden" />
          <span className="absolute -right-3 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-[#8f7a3f] lg:block" />
        </>
      ) : null}
    </article>
  );
}

function TeamSlot({ slot }: { slot: BracketSlot }) {
  if (!slot.team) {
    return (
      <div className="flex h-8 items-center justify-between rounded-md border border-dashed line-accent px-2">
        <span className="text-xs text-zinc-400">Не определена</span>
        <span className="text-sm font-semibold text-[#d8bd75]">{slot.placeholder ?? '?'}</span>
      </div>
    );
  }

  return (
    <div className="flex h-8 items-center gap-2 rounded-md border line-accent px-2">
      <TeamLogo team={slot.team} className="h-4 w-4 rounded-full object-cover" />
      <p className="truncate text-xs text-zinc-100">{slot.team.shortName || slot.team.name}</p>
    </div>
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
      className={current === target ? 'panel-matte rounded-md px-3 py-1.5 text-xs text-zinc-100' : 'rounded-md px-3 py-1.5 text-xs text-zinc-400'}
      onClick={() => onClick(target)}
    >
      {label}
    </button>
  );
}
