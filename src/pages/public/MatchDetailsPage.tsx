import { useParams } from 'react-router-dom';
import { Scoreboard } from '../../components/public/Scoreboard';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useMatch } from '../../hooks/useMatch';
import { usePlayers } from '../../hooks/usePlayers';
import { useTeams } from '../../hooks/useTeams';

export function MatchDetailsPage() {
  const { matchId = '' } = useParams();
  const match = useMatch(matchId);
  const teams = useTeams();
  const players = usePlayers();

  if (match.isLoading || teams.isLoading || players.isLoading) return <LoadingState />;
  if (match.error || teams.error || players.error) return <ErrorState message={match.error ?? teams.error ?? players.error ?? undefined} />;
  if (!match.data) return <EmptyState title="Match not found" />;

  const homeTeam = teams.data.find((team) => team.id === match.data?.homeTeamId);
  const awayTeam = teams.data.find((team) => team.id === match.data?.awayTeamId);

  return (
    <div className="space-y-4">
      <Scoreboard match={match.data} homeTeam={homeTeam} awayTeam={awayTeam} />
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="text-sm font-semibold">Timeline</h2>
        <div className="mt-3 space-y-2">
          {match.data.events.length ? match.data.events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 text-sm">
              <p>{event.minute}' · {event.type.replace('_', ' ')}</p>
              <p className="text-zinc-600">{players.data.find((player) => player.id === event.playerId)?.displayName ?? 'Team event'}</p>
            </div>
          )) : <p className="text-sm text-zinc-600">No events added.</p>}
        </div>
      </div>
    </div>
  );
}
