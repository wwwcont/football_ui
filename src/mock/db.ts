import type { AdminUser, Match, Player, Standing, Team } from '../domain/models';

export const teams: Team[] = [
  { id: 't1', name: 'Северные Волки', shortName: 'СВЛ', city: 'Североград', logoUrl: '/icons/team-placeholder.svg', coach: 'И. Миронов', group: 'A', form: ['W', 'W', 'D', 'L', 'W'], stats: { matches: 12, wins: 8, draws: 2, losses: 2, goalsFor: 23, goalsAgainst: 11, points: 26 } },
  { id: 't2', name: 'Речные Рыцари', shortName: 'РРЦ', city: 'Реченск', logoUrl: '/icons/team-placeholder.svg', coach: 'А. Росси', group: 'A', form: ['W', 'D', 'W', 'W', 'L'], stats: { matches: 12, wins: 7, draws: 3, losses: 2, goalsFor: 21, goalsAgainst: 12, points: 24 } },
  { id: 't3', name: 'Столичная Кузня', shortName: 'СКЗ', city: 'Столица', logoUrl: '/icons/team-placeholder.svg', coach: 'Д. Ковалев', group: 'A', form: ['L', 'W', 'D', 'D', 'W'], stats: { matches: 12, wins: 6, draws: 4, losses: 2, goalsFor: 18, goalsAgainst: 12, points: 22 } },
  { id: 't4', name: 'Южный Шторм', shortName: 'ЮШТ', city: 'Южный', logoUrl: '/icons/team-placeholder.svg', coach: 'П. Буров', group: 'A', form: ['W', 'L', 'W', 'W', 'D'], stats: { matches: 12, wins: 6, draws: 3, losses: 3, goalsFor: 19, goalsAgainst: 14, points: 21 } },
  { id: 't5', name: 'Восточный Факел', shortName: 'ВФК', city: 'Восток', logoUrl: '/icons/team-placeholder.svg', coach: 'Р. Алексеев', group: 'B', form: ['D', 'W', 'L', 'W', 'W'], stats: { matches: 12, wins: 7, draws: 2, losses: 3, goalsFor: 20, goalsAgainst: 13, points: 23 } },
  { id: 't6', name: 'Западные Орлы', shortName: 'ЗОР', city: 'Запад', logoUrl: '/icons/team-placeholder.svg', coach: 'Н. Левин', group: 'B', form: ['W', 'W', 'W', 'D', 'L'], stats: { matches: 12, wins: 8, draws: 1, losses: 3, goalsFor: 24, goalsAgainst: 15, points: 25 } },
];

export const players: Player[] = [
  { id: 'p1', teamId: 't1', displayName: 'Лев Грин', number: 9, position: 'FW', age: 26, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 12, goals: 10, assists: 4, yellow: 2, red: 0 } },
  { id: 'p2', teamId: 't2', displayName: 'Марк Дорн', number: 10, position: 'MF', age: 27, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 12, goals: 4, assists: 7, yellow: 3, red: 0 } },
  { id: 'p3', teamId: 't3', displayName: 'Иван Керр', number: 1, position: 'GK', age: 28, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 12, goals: 0, assists: 0, yellow: 1, red: 0 } },
  { id: 'p4', teamId: 't4', displayName: 'Руслан Алиев', number: 11, position: 'FW', age: 25, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 11, goals: 8, assists: 3, yellow: 1, red: 0 } },
  { id: 'p5', teamId: 't5', displayName: 'Тимур Сафиуллин', number: 8, position: 'MF', age: 26, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 12, goals: 3, assists: 6, yellow: 2, red: 0 } },
  { id: 'p6', teamId: 't6', displayName: 'Никита Белов', number: 7, position: 'FW', age: 23, avatarUrl: '/icons/avatar-placeholder.svg', stats: { matches: 12, goals: 9, assists: 2, yellow: 4, red: 1 } },
];

export const matches: Match[] = [
  { id: 'm1', round: 13, date: '2026-04-10', time: '18:00', venue: 'Север Арена', homeTeamId: 't1', awayTeamId: 't2', homeScore: 2, awayScore: 1, status: 'finished', events: [{ id: 'e1', minute: 17, type: 'goal', teamId: 't1', playerId: 'p1', note: 'Удар в касание' }] },
  { id: 'm2', round: 13, date: '2026-04-12', time: '17:30', venue: 'Столичный стадион', homeTeamId: 't3', awayTeamId: 't1', status: 'scheduled', events: [] },
  { id: 'm3', round: 13, date: '2026-04-12', time: '20:00', venue: 'Речной Граунд', homeTeamId: 't2', awayTeamId: 't3', homeScore: 0, awayScore: 0, status: 'live', events: [] },
  { id: 'm4', round: 14, date: '2026-04-13', time: '19:00', venue: 'Запад Парк', homeTeamId: 't6', awayTeamId: 't5', homeScore: 1, awayScore: 0, status: 'finished', events: [{ id: 'e2', minute: 38, type: 'goal', teamId: 't6', playerId: 'p6' }] },
  { id: 'm5', round: 14, date: '2026-04-17', time: '20:30', venue: 'Южная Арена', homeTeamId: 't4', awayTeamId: 't2', status: 'postponed', events: [] },
];

export const standings: Standing[] = teams
  .map((team, i) => ({
    position: i + 1,
    teamId: team.id,
    played: team.stats.matches,
    won: team.stats.wins,
    drawn: team.stats.draws,
    lost: team.stats.losses,
    gf: team.stats.goalsFor,
    ga: team.stats.goalsAgainst,
    gd: team.stats.goalsFor - team.stats.goalsAgainst,
    points: team.stats.points,
  }))
  .sort((a, b) => b.points - a.points)
  .map((item, i) => ({ ...item, position: i + 1 }));

export const adminUsers: AdminUser[] = [
  { id: 'a1', name: 'София Админ', email: 'sofia@league.local', role: 'super_admin', active: true },
  { id: 'a2', name: 'Олег Лига', email: 'oleg@league.local', role: 'league_admin', active: true },
  { id: 'a3', name: 'Мия Оператор', email: 'mia@league.local', role: 'match_operator', active: true },
];
