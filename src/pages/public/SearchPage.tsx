import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TeamLogo } from '../../components/public/TeamLogo';
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
      <form onSubmit={handleSubmit(onSubmit)} className="panel-matte rounded-2xl p-3">
        <div className="flex gap-2">
          <input
            {...register('q')}
            placeholder="Поиск команд, игроков, матчей"
            className="panel-soft h-12 flex-1 rounded-xl px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#a23a50]/50 focus:outline-none"
          />
          <button type="submit" className="accent-badge h-12 rounded-xl px-4 text-sm font-semibold">Найти</button>
        </div>
      </form>

      {!query ? <EmptyState title="Введите запрос для поиска" /> : null}
      {isLoading ? <LoadingState label="Ищем..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {query && !isLoading && !error ? (
        <div className="space-y-5">
          <Section title="Команды">
            {data.teams.length ? data.teams.map((team) => (
              <Link key={team.id} to={`/teams/${team.id}`} className="panel-soft flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm">
                <TeamLogo team={team} className="h-7 w-7" />
                <span>{team.name}</span>
              </Link>
            )) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
          <Section title="Игроки">
            {data.players.length ? data.players.map((player) => (
              <Link key={player.id} to={`/players/${player.id}`} className="panel-soft block rounded-xl px-3 py-2.5 text-sm">
                {player.displayName}
              </Link>
            )) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
          <Section title="Матчи">
            {data.matches.length ? data.matches.map((match) => (
              <Link key={match.id} to={`/matches/${match.id}`} className="panel-soft block rounded-xl px-3 py-2.5 text-sm">
                {match.id} · {match.date} · {match.venue}
              </Link>
            )) : <p className="text-sm text-zinc-500">Нет результатов</p>}
          </Section>
        </div>
      ) : null}
    </div>
  );
}
