import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Team } from '../domain/models';

export function useTeams() {
  return useAsyncData<Team[]>(() => mockRepository.getTeams(), []);
}
