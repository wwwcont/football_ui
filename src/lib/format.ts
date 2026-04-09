import type { MatchStatus } from '../domain/models';

export const statusLabel: Record<MatchStatus, string> = {
  scheduled: 'Scheduled',
  live: 'Live',
  finished: 'Finished',
  postponed: 'Postponed',
  canceled: 'Canceled',
};

export const statusTone: Record<MatchStatus, string> = {
  scheduled: 'border border-zinc-300 text-zinc-700',
  live: 'bg-zinc-900 text-white',
  finished: 'bg-zinc-100 text-zinc-800',
  postponed: 'border border-dashed border-zinc-500 text-zinc-700',
  canceled: 'border border-zinc-500 text-zinc-600',
};

export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
