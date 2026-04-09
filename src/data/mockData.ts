import { AdminUser, Match, MatchEvent, Player, ScheduleEntry, Team, TournamentSeason, TournamentStanding } from '../types/domain';

export const seasons: TournamentSeason[] = [{ id: 's1', title: 'Городская лига', year: '2026', division: 'Премьер', active: true }];

export const teams: Team[] = [
  { id: 't1', name: 'Северные Волки', shortName: 'СВЛ', logoUrl: '/icons/team-placeholder.svg', city: 'Североград', coach: 'И. Миронов', foundedYear: 1998, group: 'A', active: true, form: ['W', 'W', 'D', 'L', 'W'], description: 'Компактная прессинг-система.', stats: { matches: 12, wins: 8, draws: 2, losses: 2, goalsFor: 23, goalsAgainst: 11, points: 26 } },
  { id: 't2', name: 'Речные Рыцари', shortName: 'РРЦ', logoUrl: '/icons/team-placeholder.svg', city: 'Реченск', coach: 'А. Росси', foundedYear: 2004, group: 'A', active: true, form: ['W', 'D', 'W', 'W', 'L'], description: 'Быстрые фланги и переходы.', stats: { matches: 12, wins: 7, draws: 3, losses: 2, goalsFor: 21, goalsAgainst: 12, points: 24 } },
  { id: 't3', name: 'Столичная Кузня', shortName: 'СКЗ', logoUrl: '/icons/team-placeholder.svg', city: 'Столица', coach: 'Д. Ковалев', foundedYear: 1987, group: 'A', active: true, form: ['L', 'W', 'D', 'D', 'W'], description: 'Сильны на стандартах.', stats: { matches: 12, wins: 6, draws: 4, losses: 2, goalsFor: 18, goalsAgainst: 12, points: 22 } },
  { id: 't4', name: 'Южный Шторм', shortName: 'ЮШТ', logoUrl: '/icons/team-placeholder.svg', city: 'Южный', coach: 'П. Буров', foundedYear: 2001, group: 'A', active: true, form: ['W', 'L', 'W', 'W', 'D'], description: 'Высокий темп и вертикальные атаки.', stats: { matches: 12, wins: 6, draws: 3, losses: 3, goalsFor: 19, goalsAgainst: 14, points: 21 } },
  { id: 't5', name: 'Восточный Факел', shortName: 'ВФК', logoUrl: '/icons/team-placeholder.svg', city: 'Восток', coach: 'Р. Алексеев', foundedYear: 1995, group: 'B', active: true, form: ['D', 'W', 'L', 'W', 'W'], description: 'Команда с акцентом на контроль мяча.', stats: { matches: 12, wins: 7, draws: 2, losses: 3, goalsFor: 20, goalsAgainst: 13, points: 23 } },
  { id: 't6', name: 'Западные Орлы', shortName: 'ЗОР', logoUrl: '/icons/team-placeholder.svg', city: 'Запад', coach: 'Н. Левин', foundedYear: 1992, group: 'B', active: true, form: ['W', 'W', 'W', 'D', 'L'], description: 'Агрессивный контрпрессинг.', stats: { matches: 12, wins: 8, draws: 1, losses: 3, goalsFor: 24, goalsAgainst: 15, points: 25 } },
  { id: 't7', name: 'Горные Львы', shortName: 'ГЛВ', logoUrl: '/icons/team-placeholder.svg', city: 'Горск', coach: 'О. Титов', foundedYear: 2010, group: 'B', active: true, form: ['L', 'D', 'W', 'L', 'D'], description: 'Надежная оборона и силовой футбол.', stats: { matches: 12, wins: 4, draws: 4, losses: 4, goalsFor: 13, goalsAgainst: 14, points: 16 } },
  { id: 't8', name: 'Балтийский Ветер', shortName: 'БВТ', logoUrl: '/icons/team-placeholder.svg', city: 'Балтийск', coach: 'С. Воронцов', foundedYear: 2014, group: 'B', active: true, form: ['D', 'L', 'L', 'W', 'D'], description: 'Молодой состав и быстрый выход в атаку.', stats: { matches: 12, wins: 3, draws: 4, losses: 5, goalsFor: 12, goalsAgainst: 19, points: 13 } },
];

export const players: Player[] = [
  { id: 'p1', firstName: 'Лев', lastName: 'Грин', displayName: 'Лев Грин', teamId: 't1', number: 9, position: 'FW', birthDate: '2000-03-12', age: 26, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 1010, goals: 10, assists: 4, yellow: 2, red: 0 } },
  { id: 'p2', firstName: 'Марк', lastName: 'Дорн', displayName: 'Марк Дорн', teamId: 't2', number: 10, position: 'MF', birthDate: '1998-05-22', age: 27, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 1060, goals: 4, assists: 7, yellow: 3, red: 0 } },
  { id: 'p3', firstName: 'Иван', lastName: 'Керр', displayName: 'Иван Керр', teamId: 't3', number: 1, position: 'GK', birthDate: '1997-08-10', age: 28, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 1080, goals: 0, assists: 0, yellow: 1, red: 0, cleanSheets: 4 } },
  { id: 'p4', firstName: 'Руслан', lastName: 'Алиев', displayName: 'Руслан Алиев', teamId: 't4', number: 11, position: 'FW', birthDate: '2001-02-06', age: 25, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 11, minutes: 880, goals: 8, assists: 3, yellow: 1, red: 0 } },
  { id: 'p5', firstName: 'Тимур', lastName: 'Сафиуллин', displayName: 'Тимур Сафиуллин', teamId: 't5', number: 8, position: 'MF', birthDate: '1999-09-14', age: 26, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 990, goals: 3, assists: 6, yellow: 2, red: 0 } },
  { id: 'p6', firstName: 'Никита', lastName: 'Белов', displayName: 'Никита Белов', teamId: 't6', number: 7, position: 'FW', birthDate: '2002-11-01', age: 23, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 930, goals: 9, assists: 2, yellow: 4, red: 1 } },
  { id: 'p7', firstName: 'Артем', lastName: 'Мещеряков', displayName: 'Артем Мещеряков', teamId: 't7', number: 4, position: 'DF', birthDate: '1996-07-19', age: 29, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 1040, goals: 1, assists: 1, yellow: 5, red: 0 } },
  { id: 'p8', firstName: 'Даниил', lastName: 'Орлов', displayName: 'Даниил Орлов', teamId: 't8', number: 22, position: 'MF', birthDate: '2003-01-03', age: 23, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 10, minutes: 740, goals: 2, assists: 2, yellow: 1, red: 0 } },
  { id: 'p9', firstName: 'Егор', lastName: 'Семин', displayName: 'Егор Семин', teamId: 't1', number: 6, position: 'MF', birthDate: '1999-04-30', age: 27, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 960, goals: 2, assists: 5, yellow: 2, red: 0 } },
  { id: 'p10', firstName: 'Владислав', lastName: 'Кузин', displayName: 'Владислав Кузин', teamId: 't2', number: 5, position: 'DF', birthDate: '1995-12-11', age: 30, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 11, minutes: 980, goals: 1, assists: 1, yellow: 4, red: 0 } },
  { id: 'p11', firstName: 'Максим', lastName: 'Гончаров', displayName: 'Максим Гончаров', teamId: 't3', number: 14, position: 'MF', birthDate: '2001-10-21', age: 24, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 10, minutes: 770, goals: 4, assists: 3, yellow: 1, red: 0 } },
  { id: 'p12', firstName: 'Степан', lastName: 'Пак', displayName: 'Степан Пак', teamId: 't4', number: 1, position: 'GK', birthDate: '1998-06-05', age: 27, avatarUrl: '/icons/avatar-placeholder.svg', status: 'active', stats: { matches: 12, minutes: 1080, goals: 0, assists: 0, yellow: 0, red: 0, cleanSheets: 3 } },
];

const events: MatchEvent[] = [
  { id: 'e1', matchId: 'm1', minute: 17, type: 'goal', teamId: 't1', playerId: 'p1', note: 'Удар в касание' },
  { id: 'e2', matchId: 'm1', minute: 61, type: 'yellow_card', teamId: 't2', playerId: 'p2' },
  { id: 'e3', matchId: 'm2', minute: 79, type: 'penalty', teamId: 't3', note: 'Пенальти после VAR' },
  { id: 'e4', matchId: 'm4', minute: 38, type: 'goal', teamId: 't6', playerId: 'p6' },
  { id: 'e5', matchId: 'm5', minute: 12, type: 'own_goal', teamId: 't8', note: 'Автогол после прострела' },
  { id: 'e6', matchId: 'm6', minute: 54, type: 'substitution', teamId: 't5', playerId: 'p5', note: 'Тактическая замена' },
  { id: 'e7', matchId: 'm7', minute: 84, type: 'red_card', teamId: 't4', playerId: 'p4' },
  { id: 'e8', matchId: 'm8', minute: 67, type: 'goal', teamId: 't2', playerId: 'p2' },
];

export const matches: Match[] = [
  { id: 'm1', seasonId: 's1', round: 13, date: '2026-04-10', time: '18:00', venue: 'Север Арена', homeTeamId: 't1', awayTeamId: 't2', homeScore: 2, awayScore: 1, status: 'finished', events: events.filter((e) => e.matchId === 'm1'), referees: ['Р. Ланев'] },
  { id: 'm2', seasonId: 's1', round: 13, date: '2026-04-12', time: '17:30', venue: 'Столичный стадион', homeTeamId: 't3', awayTeamId: 't1', status: 'upcoming', events: events.filter((e) => e.matchId === 'm2'), referees: ['Т. Морозов'] },
  { id: 'm3', seasonId: 's1', round: 13, date: '2026-04-12', time: '20:00', venue: 'Речной Граунд', homeTeamId: 't2', awayTeamId: 't3', status: 'live', homeScore: 0, awayScore: 0, events: [], referees: ['Г. Стоунов'] },
  { id: 'm4', seasonId: 's1', round: 13, date: '2026-04-13', time: '19:00', venue: 'Запад Парк', homeTeamId: 't6', awayTeamId: 't7', homeScore: 1, awayScore: 0, status: 'finished', events: events.filter((e) => e.matchId === 'm4'), referees: ['И. Петров'] },
  { id: 'm5', seasonId: 's1', round: 13, date: '2026-04-13', time: '21:00', venue: 'Балтийск Арена', homeTeamId: 't8', awayTeamId: 't5', homeScore: 0, awayScore: 1, status: 'finished', events: events.filter((e) => e.matchId === 'm5'), referees: ['О. Кравец'] },
  { id: 'm6', seasonId: 's1', round: 14, date: '2026-04-17', time: '18:30', venue: 'Факел Стадиум', homeTeamId: 't5', awayTeamId: 't1', status: 'upcoming', events: events.filter((e) => e.matchId === 'm6'), referees: ['Е. Орехов'] },
  { id: 'm7', seasonId: 's1', round: 14, date: '2026-04-17', time: '20:30', venue: 'Южная Арена', homeTeamId: 't4', awayTeamId: 't2', status: 'upcoming', events: events.filter((e) => e.matchId === 'm7'), referees: ['К. Гуляев'] },
  { id: 'm8', seasonId: 's1', round: 14, date: '2026-04-18', time: '19:30', venue: 'Столичный стадион', homeTeamId: 't3', awayTeamId: 't6', status: 'live', homeScore: 1, awayScore: 1, events: events.filter((e) => e.matchId === 'm8'), referees: ['М. Астахов'] },
  { id: 'm9', seasonId: 's1', round: 14, date: '2026-04-18', time: '21:00', venue: 'Горск Арена', homeTeamId: 't7', awayTeamId: 't8', status: 'upcoming', events: [], referees: ['Л. Серов'] },
  { id: 'm10', seasonId: 's1', round: 15, date: '2026-04-24', time: '18:00', venue: 'Север Арена', homeTeamId: 't1', awayTeamId: 't4', status: 'upcoming', events: [], referees: ['Н. Блохин'] },
];

export const standings: TournamentStanding[] = teams
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
    group: team.group,
  }))
  .sort((a, b) => b.points - a.points)
  .map((item, i) => ({ ...item, position: i + 1 }));

export const scheduleEntries: ScheduleEntry[] = [
  { id: 's-e1', matchId: 'm2', date: '2026-04-12', note: 'Регулярный тур', status: 'scheduled' },
  { id: 's-e2', matchId: 'm3', date: '2026-04-12', note: 'Прайм-тайм', status: 'scheduled' },
  { id: 's-e3', matchId: 'm6', date: '2026-04-17', note: 'Центральный матч тура', status: 'scheduled' },
  { id: 's-e4', matchId: 'm8', date: '2026-04-18', note: 'Вечерний слот', status: 'scheduled' },
];

export const adminUsers: AdminUser[] = [
  { id: 'a1', name: 'София Админ', email: 'sofia@league.local', role: 'super_admin', active: true },
  { id: 'a2', name: 'Лиам Редактор', email: 'liam@league.local', role: 'editor', active: true },
  { id: 'a3', name: 'Мия Оператор', email: 'mia@league.local', role: 'match_operator', active: true },
];

export const allEvents = matches.flatMap((m) => m.events);
