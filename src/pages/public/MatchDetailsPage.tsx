import { useParams } from 'react-router-dom';
import { Scoreboard } from '../../components/public/Scoreboard';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatch } from '../../hooks/useMatch';
import { useMatches } from '../../hooks/useMatches';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeams } from '../../hooks/useTeams';

export function MatchDetailsPage() {
  const { matchId = '' } = useParams();
  const match = useMatch(matchId);
  const allMatches = useMatches();
  const teams = useTeams();
  const players = usePlayers();

  if (match.isLoading || teams.isLoading || players.isLoading || allMatches.isLoading) return <LoadingState />;
  if (match.error || teams.error || players.error || allMatches.error) {
    return <ErrorState message={match.error ?? teams.error ?? players.error ?? allMatches.error ?? undefined} />;
  }
  if (!match.data) return <EmptyState title="Матч не найден" />;

  const homeTeam = teams.data.find((team) => team.id === match.data?.homeTeamId);
  const awayTeam = teams.data.find((team) => team.id === match.data?.awayTeamId);

  const recentForTeam = (teamId: string) => allMatches.data
    .filter((item) => item.id !== match.data!.id && (item.homeTeamId === teamId || item.awayTeamId === teamId))
    .slice(0, 3)
    .map((item) => {
      const isHome = item.homeTeamId === teamId;
      const own = isHome ? item.homeScore ?? 0 : item.awayScore ?? 0;
      const opp = isHome ? item.awayScore ?? 0 : item.homeScore ?? 0;
      return `${item.id}: ${own}:${opp}`;
    });

  return (
    <div className="space-y-4">
      <Scoreboard match={match.data} homeTeam={homeTeam} awayTeam={awayTeam} />
      <div className="panel-matte rounded-2xl p-4">
        <h2 className="section-title">Краткая форма команд</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="panel-soft rounded-xl p-3 text-sm">
            <p className="font-medium text-zinc-100">{homeTeam?.name}</p>
            <p className="mt-1 text-zinc-400">Последние игры: {recentForTeam(match.data.homeTeamId).join(', ') || 'нет данных'}</p>
          </div>
          <div className="panel-soft rounded-xl p-3 text-sm">
            <p className="font-medium text-zinc-100">{awayTeam?.name}</p>
            <p className="mt-1 text-zinc-400">Последние игры: {recentForTeam(match.data.awayTeamId).join(', ') || 'нет данных'}</p>
          </div>
        </div>
      </div>

      <div className="panel-matte rounded-2xl p-4">
        <h2 className="section-title">События матча</h2>
        <div className="mt-3 space-y-2">
          {match.data.events.length ? match.data.events.map((event) => (
            <div key={event.id} className="panel-soft flex items-center justify-between rounded-xl px-3 py-2.5 text-sm">
              <p>{event.minute}' · {event.type.replace('_', ' ')}</p>
              <p className="text-zinc-400">{players.data.find((player) => player.id === event.playerId)?.displayName ?? 'Командное событие'}</p>
            </div>
          )) : <p className="text-sm text-zinc-400">Событий пока нет.</p>}
        </div>
      </div>
    </div>
  );
}
