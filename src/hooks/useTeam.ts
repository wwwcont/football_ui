import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Team } from '../domain/models';

export function useTeam(teamId: string) {
  return useAsyncData<Team | null>(() => mockRepository.getTeam(teamId), null, [teamId]);
}
