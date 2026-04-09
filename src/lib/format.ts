import type { MatchStatus } from '../domain/models';

export const statusLabel: Record<MatchStatus, string> = {
  scheduled: 'Запланирован',
  live: 'LIVE',
  finished: 'Завершен',
  postponed: 'Перенесен',
  canceled: 'Отменен',
};

export const statusTone: Record<MatchStatus, string> = {
  scheduled: 'border border-zinc-600 text-zinc-300',
  live: 'bg-white text-zinc-900',
  finished: 'bg-zinc-800 text-zinc-200',
  postponed: 'border border-dashed border-zinc-500 text-zinc-300',
  canceled: 'border border-zinc-500 text-zinc-400',
};

export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
