import { AdminUser, Match, MatchEvent, Player, ScheduleEntry, Team, TournamentSeason, TournamentStanding } from '../types/domain';

export const seasons: TournamentSeason[] = [{ id: 's1', title: 'City League', year: '2026', division: 'Premier', active: true }];
export const teams: Team[] = [
  { id: 't1', name: 'North Wolves', shortName: 'NWV', logoUrl: '/icons/team-placeholder.svg', city: 'North City', coach: 'J. Miller', foundedYear: 1998, group: 'A', active: true, form: ['W','W','D','L','W'], description: 'Compact pressing team.', stats: { matches: 8, wins: 6, draws: 1, losses: 1, goalsFor: 17, goalsAgainst: 6, points: 19 } },
  { id: 't2', name: 'River Knights', shortName: 'RVK', logoUrl: '/icons/team-placeholder.svg', city: 'River Town', coach: 'A. Rossi', foundedYear: 2004, group: 'A', active: true, form: ['W','D','W','W','L'], description: 'Fast transitions and wing play.', stats: { matches: 8, wins: 5, draws: 2, losses: 1, goalsFor: 14, goalsAgainst: 8, points: 17 } },
  { id: 't3', name: 'Capital Forge', shortName: 'CFG', logoUrl: '/icons/team-placeholder.svg', city: 'Capital', coach: 'D. Cole', foundedYear: 1987, group: 'A', active: true, form: ['L','W','D','D','W'], description: 'Set-piece specialists.', stats: { matches: 8, wins: 4, draws: 3, losses: 1, goalsFor: 12, goalsAgainst: 9, points: 15 } },
];

export const players: Player[] = [
  { id: 'p1', firstName: 'Leo', lastName: 'Grin', displayName: 'Leo Grin', teamId: 't1', number: 9, position: 'FW', birthDate: '2000-03-12', age: 26, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 8, minutes: 690, goals: 7, assists: 2, yellow: 1, red: 0 } },
  { id: 'p2', firstName: 'Mark', lastName: 'Dorn', displayName: 'Mark Dorn', teamId: 't2', number: 10, position: 'MF', birthDate: '1998-05-22', age: 27, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 8, minutes: 720, goals: 3, assists: 5, yellow: 2, red: 0 } },
  { id: 'p3', firstName: 'Ivan', lastName: 'Kerr', displayName: 'Ivan Kerr', teamId: 't3', number: 1, position: 'GK', birthDate: '1997-08-10', age: 28, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 8, minutes: 720, goals: 0, assists: 0, yellow: 1, red: 0, cleanSheets: 3 } },
];

const events: MatchEvent[] = [
  { id: 'e1', matchId: 'm1', minute: 24, type: 'goal', teamId: 't1', playerId: 'p1', note: 'Right-foot finish' },
  { id: 'e2', matchId: 'm1', minute: 61, type: 'yellow_card', teamId: 't2', playerId: 'p2' },
  { id: 'e3', matchId: 'm2', minute: 79, type: 'penalty', teamId: 't3', note: 'VAR awarded' },
];

export const matches: Match[] = [
  { id: 'm1', seasonId: 's1', round: 9, date: '2026-04-10', time: '18:00', venue: 'North Arena', homeTeamId: 't1', awayTeamId: 't2', homeScore: 2, awayScore: 1, status: 'finished', events: events.filter((e) => e.matchId === 'm1'), referees: ['R. Lane'] },
  { id: 'm2', seasonId: 's1', round: 9, date: '2026-04-12', time: '17:30', venue: 'Capital Stadium', homeTeamId: 't3', awayTeamId: 't1', status: 'upcoming', events: events.filter((e) => e.matchId === 'm2'), referees: ['T. Moore'] },
  { id: 'm3', seasonId: 's1', round: 9, date: '2026-04-12', time: '20:00', venue: 'River Ground', homeTeamId: 't2', awayTeamId: 't3', status: 'live', homeScore: 0, awayScore: 0, events: [], referees: ['G. Stone'] },
];

export const standings: TournamentStanding[] = teams
  .map((team, i) => ({ position: i + 1, teamId: team.id, played: team.stats.matches, won: team.stats.wins, drawn: team.stats.draws, lost: team.stats.losses, gf: team.stats.goalsFor, ga: team.stats.goalsAgainst, gd: team.stats.goalsFor - team.stats.goalsAgainst, points: team.stats.points, group: team.group }))
  .sort((a, b) => b.points - a.points);

export const scheduleEntries: ScheduleEntry[] = [
  { id: 's-e1', matchId: 'm2', date: '2026-04-12', note: 'Regular fixture', status: 'scheduled' },
  { id: 's-e2', matchId: 'm3', date: '2026-04-12', note: 'Prime-time slot', status: 'scheduled' },
];

export const adminUsers: AdminUser[] = [
  { id: 'a1', name: 'Sofia Admin', email: 'sofia@league.local', role: 'super_admin', active: true },
  { id: 'a2', name: 'Liam Editor', email: 'liam@league.local', role: 'editor', active: true },
  { id: 'a3', name: 'Mia Operator', email: 'mia@league.local', role: 'match_operator', active: true },
];

export const allEvents = matches.flatMap((m) => m.events);
