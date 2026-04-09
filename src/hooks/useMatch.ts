import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Match } from '../domain/models';

export function useMatch(matchId: string) {
  return useAsyncData<Match | null>(() => mockRepository.getMatch(matchId), null, [matchId]);
}
