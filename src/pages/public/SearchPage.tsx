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
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
        <div className="flex gap-2">
          <input {...register('q')} placeholder="Поиск команд, игроков, матчей" className="h-11 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm focus:border-zinc-500 focus:outline-none" />
          <button type="submit" className="h-11 rounded-lg bg-white px-4 text-sm font-medium text-zinc-900">Найти</button>
        </div>
      </form>

      {!query ? <EmptyState title="Введите запрос для поиска" /> : null}
      {isLoading ? <LoadingState label="Ищем..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {query && !isLoading && !error ? (
        <div className="space-y-4">
          <Section title="Команды">
            {data.teams.length ? data.teams.map((team) => <p key={team.id} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">{team.name}</p>) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
          <Section title="Игроки">
            {data.players.length ? data.players.map((player) => <p key={player.id} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">{player.displayName}</p>) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
          <Section title="Матчи">
            {data.matches.length ? data.matches.map((match) => <p key={match.id} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">{match.id} · {match.venue}</p>) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
        </div>
      ) : null}
    </div>
  );
}
