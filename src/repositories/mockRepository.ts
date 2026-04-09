import type { AdminUser, Match, SearchResults, Standing, Team, Player } from '../domain/models';
import { adminUsers, matches, players, standings, teams } from '../mock/db';

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

const byQuery = (query: string, value: string) => value.toLowerCase().includes(query.toLowerCase());

export const mockRepository = {
  async getTeams(): Promise<Team[]> {
    await delay();
    return teams;
  },
  async getTeam(teamId: string): Promise<Team | null> {
    await delay();
    return teams.find((team) => team.id === teamId) ?? null;
  },
  async getPlayers(): Promise<Player[]> {
    await delay();
    return players;
  },
  async getPlayer(playerId: string): Promise<Player | null> {
    await delay();
    return players.find((player) => player.id === playerId) ?? null;
  },
  async getMatches(): Promise<Match[]> {
    await delay();
    return matches;
  },
  async getMatch(matchId: string): Promise<Match | null> {
    await delay();
    return matches.find((match) => match.id === matchId) ?? null;
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
};
