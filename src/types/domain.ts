export type MatchStatus = 'upcoming' | 'live' | 'finished' | 'postponed' | 'cancelled';
export type MatchEventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'own_goal' | 'penalty' | 'admin';
export type PlayerStatus = 'active' | 'injured' | 'suspended' | 'left';
export type AdminRole = 'super_admin' | 'editor' | 'match_operator';

export interface PlayerStats { matches: number; minutes: number; goals: number; assists: number; yellow: number; red: number; cleanSheets?: number; }
export interface TeamStats { matches: number; wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number; points: number; }

export interface Team { id: string; name: string; shortName: string; logoUrl: string; city: string; coach: string; foundedYear: number; group: string; active: boolean; form: string[]; stats: TeamStats; description: string; }
export interface Player { id: string; firstName: string; lastName: string; displayName: string; teamId: string; number: number; position: 'GK'|'DF'|'MF'|'FW'; birthDate: string; age: number; avatarUrl: string; status: PlayerStatus; stats: PlayerStats; }
export interface MatchEvent { id: string; matchId: string; minute: number; type: MatchEventType; teamId: string; playerId?: string; secondaryPlayerId?: string; note?: string; }
export interface Match { id: string; seasonId: string; round: number; date: string; time: string; venue: string; homeTeamId: string; awayTeamId: string; homeScore?: number; awayScore?: number; status: MatchStatus; events: MatchEvent[]; referees: string[]; }
export interface TournamentStanding { position: number; teamId: string; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; gd: number; points: number; group: string; }
export interface ScheduleEntry { id: string; matchId: string; date: string; note: string; status: 'scheduled'|'rescheduled'|'cancelled'; }
export interface TournamentSeason { id: string; title: string; year: string; division: string; active: boolean; }
export interface AdminUser { id: string; name: string; email: string; role: AdminRole; active: boolean; }
