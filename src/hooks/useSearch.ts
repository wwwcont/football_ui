import { useEffect, useState } from 'react';
import type { SearchResults } from '../domain/models';
import { mockRepository } from '../repositories/mockRepository';

const empty: SearchResults = { teams: [], players: [], matches: [] };

export function useSearch(query: string) {
  const [data, setData] = useState<SearchResults>(empty);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setData(empty);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await mockRepository.search(trimmed);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Search failed');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { data, isLoading, error };
}
