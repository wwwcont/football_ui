import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Match } from '../domain/models';

export function useMatches() {
  return useAsyncData<Match[]>(() => mockRepository.getMatches(), []);
}
