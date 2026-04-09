import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Player } from '../domain/models';

export function usePlayer(playerId: string) {
  return useAsyncData<Player | null>(() => mockRepository.getPlayer(playerId), null, [playerId]);
}
