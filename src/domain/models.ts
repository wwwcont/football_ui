export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'canceled';
export type AdminRole = 'match_operator' | 'league_admin' | 'super_admin';

export interface TeamStats {
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  logoUrl: string;
  coach: string;
  group: string;
  form: string[];
  stats: TeamStats;
}

export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
}

export interface Player {
  id: string;
  teamId: string;
  displayName: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  age: number;
  avatarUrl: string;
  stats: PlayerStats;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'own_goal';
  teamId: string;
  playerId?: string;
  note?: string;
}

export interface Match {
  id: string;
  round: number;
  date: string;
  time: string;
  venue: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  events: MatchEvent[];
}

export interface Standing {
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface SearchResults {
  teams: Team[];
  players: Player[];
  matches: Match[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
}

export interface AdminSession {
  userId: string;
  name: string;
  role: AdminRole;
}
