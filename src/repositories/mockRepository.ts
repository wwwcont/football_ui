import type {
  AdminUser,
  Match,
  MatchEvent,
  MatchStatus,
  Player,
  SearchResults,
  Standing,
  Team,
} from '../domain/models';
import { adminUsers, matches, players, standings, teams } from '../mock/db';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const byQuery = (query: string, value: string) => value.toLowerCase().includes(query.toLowerCase());

function replaceById<T extends { id: string }>(list: T[], item: T): T {
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index >= 0) {
    list[index] = item;
  }
  return item;
}

export const mockRepository = {
  async getTeams(): Promise<Team[]> {
    await delay();
    return teams;
  },
  async getTeam(teamId: string): Promise<Team | null> {
    await delay();
    return teams.find((team) => team.id === teamId) ?? null;
  },
  async updateTeam(team: Team): Promise<Team> {
    await delay();
    return replaceById(teams, team);
  },
  async getPlayers(): Promise<Player[]> {
    await delay();
    return players;
  },
  async getPlayer(playerId: string): Promise<Player | null> {
    await delay();
    return players.find((player) => player.id === playerId) ?? null;
  },
  async updatePlayer(player: Player): Promise<Player> {
    await delay();
    return replaceById(players, player);
  },
  async getMatches(): Promise<Match[]> {
    await delay();
    return matches;
  },
  async getMatch(matchId: string): Promise<Match | null> {
    await delay();
    return matches.find((match) => match.id === matchId) ?? null;
  },
  async updateMatch(match: Match): Promise<Match> {
    await delay();
    return replaceById(matches, match);
  },
  async createMatch(payload: Omit<Match, 'events'> & { events?: MatchEvent[] }): Promise<Match> {
    await delay();
    const next: Match = { ...payload, events: payload.events ?? [] };
    matches.unshift(next);
    return next;
  },
  async addMatchEvent(matchId: string, event: Omit<MatchEvent, 'id'>): Promise<Match | null> {
    await delay();
    const match = matches.find((item) => item.id === matchId);
    if (!match) return null;
    const nextEvent: MatchEvent = {
      id: `e${Date.now()}`,
      ...event,
    };
    match.events = [...match.events, nextEvent].sort((a, b) => a.minute - b.minute);

    if (event.type === 'goal' || event.type === 'own_goal') {
      if (event.teamId === match.homeTeamId) {
        match.homeScore = (match.homeScore ?? 0) + 1;
      } else if (event.teamId === match.awayTeamId) {
        match.awayScore = (match.awayScore ?? 0) + 1;
      }
      if (match.status === 'scheduled') {
        match.status = 'live';
      }
    }

    return match;
  },
  async finishMatch(matchId: string): Promise<Match | null> {
    await delay();
    const match = matches.find((item) => item.id === matchId);
    if (!match) return null;
    match.status = 'finished';
    return match;
  },
  async getStandings(): Promise<Standing[]> {
    await delay();
    return standings;
  },
  async search(query: string): Promise<SearchResults> {
    await delay();
    if (!query.trim()) {
      return { teams: [], players: [], matches: [] };
    }
    return {
      teams: teams.filter((team) => byQuery(query, `${team.name} ${team.shortName}`)),
      players: players.filter((player) => byQuery(query, player.displayName)),
      matches: matches.filter((match) => byQuery(query, `${match.venue} ${match.id}`)),
    };
  },
  async getAdminUsers(): Promise<AdminUser[]> {
    await delay();
    return adminUsers;
  },
  async updateAdminRole(userId: string, role: AdminUser['role']): Promise<AdminUser | null> {
    await delay();
    const user = adminUsers.find((item) => item.id === userId);
    if (!user) return null;
    user.role = role;
    return user;
  },
  async setMatchStatus(matchId: string, status: MatchStatus): Promise<Match | null> {
    await delay();
    const match = matches.find((item) => item.id === matchId);
    if (!match) return null;
    match.status = status;
    return match;
  },
};
