import { useAsyncData } from './useAsyncData';
import { mockRepository } from '../repositories/mockRepository';
import type { Standing } from '../domain/models';

export function useStandings() {
  return useAsyncData<Standing[]>(() => mockRepository.getStandings(), []);
}
