import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { adminUsers, players, teams } from '../../data/mockData';
import { AdminSession } from '../../hooks/useMockAdminAuth';
import { Button, Input, Select } from '../../components/ui/FormControls';
import { EmptyState, PageContainer, SectionHeader } from '../../components/ui/Primitives';

type CaptainUser = { id: string; email: string; password: string; teamId: string; name: string };
type AdminAccount = { id: string; email: string; password: string; name: string; roleLabel: string };

type TeamDraft = Record<string, { description: string; logoUrl: string }>;
type PlayerDraft = Record<string, { displayName: string; position: 'GK' | 'DF' | 'MF' | 'FW'; number: number }>;

type EventDraft = { title: string; date: string; note: string };

const captainUsers: CaptainUser[] = [
  { id: 'c1', email: 'captain1@league.local', password: '123456', teamId: 't1', name: 'Капитан СВЛ' },
  { id: 'c2', email: 'captain2@league.local', password: '123456', teamId: 't2', name: 'Капитан РРЦ' },
  { id: 'c3', email: 'captain3@league.local', password: '123456', teamId: 't3', name: 'Капитан СКЗ' },
];

const adminAccounts: AdminAccount[] = adminUsers.map((u) => ({
  id: u.id,
  email: u.email,
  password: '123456',
  name: u.name,
  roleLabel: u.role === 'super_admin' ? 'Полный администратор' : 'Администратор лиги',
}));

export function AdminLoginPage({ onLogin }: { onLogin: (session: AdminSession) => void }) {
  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm<{ email: string; password: string }>();

  const submit = ({ email, password }: { email: string; password: string }) => {
    const normalizedEmail = email.toLowerCase();
    const admin = adminAccounts.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
    if (admin) {
      onLogin({ role: 'admin', userId: admin.id });
      return;
    }

    const captain = captainUsers.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
    if (captain) {
      onLogin({ role: 'captain', userId: captain.id });
      return;
    }

    setError('password', { message: 'Неверная почта или пароль.' });
  };

  return (
    <PageContainer title="Вход" subtitle="Личный кабинет турнира">
      <form className="card mx-auto max-w-md space-y-3 p-4" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Почта" {...register('email', { required: true })} />
        <Input type="password" placeholder="Пароль" {...register('password', { required: true })} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <Button type="submit" className="w-full">Войти</Button>
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            const mockAdmin = adminAccounts[0];
            if (!mockAdmin) return;
            setValue('email', mockAdmin.email);
            setValue('password', mockAdmin.password);
            onLogin({ role: 'admin', userId: mockAdmin.id });
          }}
        >
          Войти как демо-админ
        </Button>
      </form>
      <div className="card mx-auto mt-4 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        Демо доступы: капитан команды и администратор лиги. Для всех аккаунтов пароль: <b>123456</b>.
      </div>
    </PageContainer>
  );
}

export function AdminDashboardPage({ session }: { session: AdminSession }) {
  const captain = captainUsers.find((u) => u.id === session.userId);
  const admin = adminAccounts.find((u) => u.id === session.userId);

  const canEditAll = session.role === 'admin';
  const managedTeam = canEditAll ? null : teams.find((t) => t.id === captain?.teamId);
  const visibleTeams = canEditAll ? teams : managedTeam ? [managedTeam] : [];
  const visiblePlayers = canEditAll ? players : players.filter((p) => p.teamId === managedTeam?.id);

  const [teamDraft, setTeamDraft] = useState<TeamDraft>(() =>
    teams.reduce((acc, team) => ({ ...acc, [team.id]: { description: team.description, logoUrl: team.logoUrl } }), {}),
  );

  const [playerDraft, setPlayerDraft] = useState<PlayerDraft>(() =>
    players.reduce((acc, player) => ({ ...acc, [player.id]: { displayName: player.displayName, position: player.position, number: player.number } }), {}),
  );

  const [eventDraft, setEventDraft] = useState<EventDraft>({ title: '', date: '', note: '' });
  const [createdEvents, setCreatedEvents] = useState<EventDraft[]>([]);

  const changedPlayers = useMemo(() => visiblePlayers.filter((p) => {
    const draft = playerDraft[p.id];
    return draft.displayName !== p.displayName || draft.number !== p.number || draft.position !== p.position;
  }).length, [playerDraft, visiblePlayers]);

  const changedTeams = useMemo(() => visibleTeams.filter((team) => {
    const draft = teamDraft[team.id];
    return draft.description !== team.description || draft.logoUrl !== team.logoUrl;
  }).length, [teamDraft, visibleTeams]);

  if (!canEditAll && (!captain || !managedTeam)) {
    return <PageContainer title="Кабинет"><EmptyState title="Доступ ограничен" description="Ваш аккаунт не привязан к команде." /></PageContainer>;
  }

  const userLabel = canEditAll ? `${admin?.name} · ${admin?.roleLabel}` : `${captain?.name} · капитан команды`;

  return (
    <PageContainer
      title={canEditAll ? 'Панель администратора' : `Личный кабинет · ${managedTeam?.shortName}`}
      subtitle={canEditAll ? 'Права: управление всеми командами, игроками и событиями турнира' : `Права: только команда ${managedTeam?.name} и её игроки`}
    >
      <div className="card text-sm text-zinc-600 dark:text-zinc-300">
        Роль: <b>{canEditAll ? 'Администратор' : 'Капитан'}</b>. Пользователь: {userLabel}.
      </div>

      {visibleTeams.map((team) => (
        <div key={team.id} className="card">
          <SectionHeader title={`Профиль команды · ${team.shortName}`} />
          <div className="grid gap-3 md:grid-cols-[120px_1fr] md:items-start">
            <div className="space-y-2">
              <img src={teamDraft[team.id].logoUrl} className="h-24 w-24 rounded-xl border border-zinc-200 object-cover dark:border-zinc-700" />
              <Input placeholder="URL PNG логотипа" value={teamDraft[team.id].logoUrl} onChange={(e) => setTeamDraft((prev) => ({ ...prev, [team.id]: { ...prev[team.id], logoUrl: e.target.value } }))} />
            </div>
            <div className="space-y-2">
              <Input value={team.name} disabled />
              <Input value={team.city} disabled />
              <textarea className="input min-h-28" value={teamDraft[team.id].description} onChange={(e) => setTeamDraft((prev) => ({ ...prev, [team.id]: { ...prev[team.id], description: e.target.value } }))} />
            </div>
          </div>
        </div>
      ))}

      <div className="card">
        <SectionHeader title={canEditAll ? 'Игроки всех команд' : 'Игроки команды'} right={<span className="text-xs text-zinc-500">Изменено: {changedPlayers}</span>} />
        <div className="space-y-3">
          {visiblePlayers.map((p) => (
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

      {canEditAll && (
        <div className="card">
          <SectionHeader title="Создание события турнира" />
          <div className="grid gap-2 md:grid-cols-3">
            <Input placeholder="Заголовок" value={eventDraft.title} onChange={(e) => setEventDraft((prev) => ({ ...prev, title: e.target.value }))} />
            <Input type="date" value={eventDraft.date} onChange={(e) => setEventDraft((prev) => ({ ...prev, date: e.target.value }))} />
            <Input placeholder="Короткая заметка" value={eventDraft.note} onChange={(e) => setEventDraft((prev) => ({ ...prev, note: e.target.value }))} />
          </div>
          <Button
            className="mt-3"
            onClick={() => {
              if (!eventDraft.title.trim()) return;
              setCreatedEvents((prev) => [{ ...eventDraft }, ...prev]);
              setEventDraft({ title: '', date: '', note: '' });
            }}
          >
            Создать событие
          </Button>
          <div className="mt-3 space-y-2">
            {createdEvents.length
              ? createdEvents.map((event, index) => <div key={`${event.title}-${index}`} className="rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700">{event.date || 'Без даты'} · {event.title} {event.note ? `· ${event.note}` : ''}</div>)
              : <p className="text-sm text-zinc-500 dark:text-zinc-400">Пока событий нет.</p>}
          </div>
        </div>
      )}

      <div className="sticky bottom-16 md:bottom-4">
        <Button className="w-full">Сохранить изменения (мок)</Button>
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">Изменения пока хранятся локально в браузере и не отправляются на сервер.</p>
      </div>

      <div className="card text-sm text-zinc-600 dark:text-zinc-300">Изменения команд: <b>{changedTeams}</b>.</div>
    </PageContainer>
  );
}
