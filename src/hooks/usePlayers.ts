import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Player } from '../domain/models';

export function usePlayers() {
  return useAsyncData<Player[]>(() => mockRepository.getPlayers(), []);
}
