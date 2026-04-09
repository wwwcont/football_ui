import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Section } from '../../components/ui/Section';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useSearch } from '../../hooks/useSearch';

type SearchFormValues = { q: string };

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const { register, handleSubmit } = useForm<SearchFormValues>({ defaultValues: { q: query } });
  const { data, isLoading, error } = useSearch(query);

  const onSubmit = ({ q }: SearchFormValues) => {
    setParams(q ? { q } : {});
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-zinc-200 bg-white p-3">
        <div className="flex gap-2">
          <input {...register('q')} placeholder="Search teams, players, matches" className="h-11 flex-1 rounded-lg border border-zinc-300 px-3 text-sm focus:border-zinc-500 focus:outline-none" />
          <button type="submit" className="h-11 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white">Search</button>
        </div>
      </form>

      {!query ? <EmptyState title="Start typing to search" /> : null}
      {isLoading ? <LoadingState label="Searching..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {query && !isLoading && !error ? (
        <div className="space-y-4">
          <Section title="Teams">
            {data.teams.length ? data.teams.map((team) => <p key={team.id} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">{team.name}</p>) : <p className="text-sm text-zinc-500">No teams</p>}
          </Section>
          <Section title="Players">
            {data.players.length ? data.players.map((player) => <p key={player.id} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">{player.displayName}</p>) : <p className="text-sm text-zinc-500">No players</p>}
          </Section>
          <Section title="Matches">
            {data.matches.length ? data.matches.map((match) => <p key={match.id} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm">{match.id} · {match.venue}</p>) : <p className="text-sm text-zinc-500">No matches</p>}
          </Section>
        </div>
      ) : null}
    </div>
  );
}
