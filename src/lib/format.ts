import type { MatchStatus } from '../domain/models';

export const statusLabel: Record<MatchStatus, string> = {
  scheduled: 'Запланирован',
  live: 'LIVE',
  finished: 'Завершен',
  postponed: 'Перенесен',
  canceled: 'Отменен',
};

export const statusTone: Record<MatchStatus, string> = {
  scheduled: 'border border-zinc-600/80 bg-zinc-900/80 text-zinc-300',
  live: 'border border-[#a23a50]/60 bg-[#7c2233]/35 text-rose-100',
  finished: 'border border-zinc-600/70 bg-zinc-800/70 text-zinc-100',
  postponed: 'border border-dashed border-zinc-500 text-zinc-300',
  canceled: 'border border-zinc-500 text-zinc-400',
};

export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
