import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { players, teams } from '../../data/mockData';
import { Button, Input, Select } from '../../components/ui/FormControls';
import { EmptyState, PageContainer, SectionHeader } from '../../components/ui/Primitives';

type CaptainUser = { id: string; email: string; password: string; teamId: string; name: string };

type TeamDraft = Record<string, { description: string; logoUrl: string }>;
type PlayerDraft = Record<string, { displayName: string; position: 'GK' | 'DF' | 'MF' | 'FW'; number: number }>;

const captainUsers: CaptainUser[] = [
  { id: 'c1', email: 'captain1@league.local', password: '123456', teamId: 't1', name: 'Капитан СВЛ' },
  { id: 'c2', email: 'captain2@league.local', password: '123456', teamId: 't2', name: 'Капитан РРЦ' },
  { id: 'c3', email: 'captain3@league.local', password: '123456', teamId: 't3', name: 'Капитан СКЗ' },
];

export function AdminLoginPage({ onLogin }: { onLogin: (captainId: string) => void }) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<{ email: string; password: string }>();

  const submit = ({ email, password }: { email: string; password: string }) => {
    const account = captainUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!account) {
      setError('password', { message: 'Неверная почта или пароль.' });
      return;
    }
    onLogin(account.id);
  };

  return (
    <PageContainer title="Вход" subtitle="Личный кабинет капитана команды">
      <form className="card mx-auto max-w-md space-y-3 p-4" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Почта" {...register('email', { required: true })} />
        <Input type="password" placeholder="Пароль" {...register('password', { required: true })} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <Button type="submit" className="w-full">Войти</Button>
      </form>
      <div className="card mx-auto mt-4 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        Демо-аккаунты создаются администратором. Капитаны могут редактировать только описание команды, логотип и карточки игроков своей команды.
      </div>
    </PageContainer>
  );
}

export function AdminDashboardPage({ captainId }: { captainId: string }) {
  const captain = captainUsers.find((u) => u.id === captainId);
  const managedTeam = teams.find((t) => t.id === captain?.teamId);
  const teamPlayers = players.filter((p) => p.teamId === managedTeam?.id);

  const [teamDraft, setTeamDraft] = useState<TeamDraft>(() =>
    teams.reduce((acc, team) => ({ ...acc, [team.id]: { description: team.description, logoUrl: team.logoUrl } }), {}),
  );

  const [playerDraft, setPlayerDraft] = useState<PlayerDraft>(() =>
    players.reduce((acc, player) => ({ ...acc, [player.id]: { displayName: player.displayName, position: player.position, number: player.number } }), {}),
  );

  const changedPlayers = useMemo(() => teamPlayers.filter((p) => {
    const draft = playerDraft[p.id];
    return draft.displayName !== p.displayName || draft.number !== p.number || draft.position !== p.position;
  }).length, [playerDraft, teamPlayers]);

  const changedTeam = managedTeam ? teamDraft[managedTeam.id].description !== managedTeam.description || teamDraft[managedTeam.id].logoUrl !== managedTeam.logoUrl : false;

  if (!captain || !managedTeam) {
    return <PageContainer title="Кабинет"><EmptyState title="Доступ ограничен" description="Ваш аккаунт не привязан к команде." /></PageContainer>;
  }

  return (
    <PageContainer title={`Кабинет · ${managedTeam.shortName}`} subtitle={`Права: только команда ${managedTeam.name} и её игроки`}>
      <div className="card">
        <SectionHeader title="Профиль команды" />
        <div className="grid gap-3 md:grid-cols-[120px_1fr] md:items-start">
          <div className="space-y-2">
            <img src={teamDraft[managedTeam.id].logoUrl} className="h-24 w-24 rounded-xl border border-zinc-200 object-cover dark:border-zinc-700" />
            <Input placeholder="URL PNG логотипа" value={teamDraft[managedTeam.id].logoUrl} onChange={(e) => setTeamDraft((prev) => ({ ...prev, [managedTeam.id]: { ...prev[managedTeam.id], logoUrl: e.target.value } }))} />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">В будущем: загрузка PNG на сервер, автокроп до квадрата.</p>
          </div>
          <div className="space-y-2">
            <Input value={managedTeam.name} disabled />
            <Input value={managedTeam.city} disabled />
            <textarea className="input min-h-28" value={teamDraft[managedTeam.id].description} onChange={(e) => setTeamDraft((prev) => ({ ...prev, [managedTeam.id]: { ...prev[managedTeam.id], description: e.target.value } }))} />
          </div>
        </div>
      </div>

      <div className="card">
        <SectionHeader title="Игроки команды" right={<span className="text-xs text-zinc-500">Изменено: {changedPlayers}</span>} />
        <div className="space-y-3">
          {teamPlayers.map((p) => (
            <div key={p.id} className="grid gap-2 rounded-xl border border-zinc-200 p-3 md:grid-cols-[1.5fr_120px_120px] dark:border-zinc-700">
              <Input value={playerDraft[p.id].displayName} onChange={(e) => setPlayerDraft((prev) => ({ ...prev, [p.id]: { ...prev[p.id], displayName: e.target.value } }))} />
              <Input type="number" value={playerDraft[p.id].number} onChange={(e) => setPlayerDraft((prev) => ({ ...prev, [p.id]: { ...prev[p.id], number: Number(e.target.value) } }))} />
              <Select value={playerDraft[p.id].position} onChange={(e) => setPlayerDraft((prev) => ({ ...prev, [p.id]: { ...prev[p.id], position: e.target.value as 'GK' | 'DF' | 'MF' | 'FW' } }))}>
                <option value="GK">GK</option><option value="DF">DF</option><option value="MF">MF</option><option value="FW">FW</option>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-16 md:bottom-4">
        <Button className="w-full">Сохранить изменения (мок)</Button>
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">Изменения пока хранятся локально в браузере и не отправляются на сервер.</p>
      </div>

      <div className="card text-sm text-zinc-600 dark:text-zinc-300">
        Изменения команды: <b>{changedTeam ? 1 : 0}</b>. Пользователь: {captain.name}.
      </div>
    </PageContainer>
  );
}
