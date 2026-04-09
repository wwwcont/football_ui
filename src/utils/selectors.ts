import { matches, players, teams } from '../data/mockData';

export const teamById = (id: string) => teams.find((t) => t.id === id);
export const playerById = (id: string) => players.find((p) => p.id === id);
export const matchById = (id: string) => matches.find((m) => m.id === id);
