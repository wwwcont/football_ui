import { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { useTeams } from '../../hooks/useTeams';
import { mockRepository } from '../../repositories/mockRepository';
import type { Team } from '../../domain/models';

export function AdminTeamsPage() {
  const teams = useTeams();
  const [savingId, setSavingId] = useState<string | null>(null);

  if (teams.isLoading) return <LoadingState />;
  if (teams.error) return <ErrorState message={teams.error} />;
  if (!teams.data.length) return <EmptyState title="Команды не добавлены" />;

  const handleFieldChange = async (team: Team, field: keyof Team, value: string) => {
    setSavingId(team.id);
    await mockRepository.updateTeam({ ...team, [field]: value });
    setSavingId(null);
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Команды" description="Админ может редактировать любую информацию" />
      <div className="space-y-2">
        {teams.data.map((team) => (
          <div key={team.id} className="rounded-xl bg-zinc-900 px-4 py-3 text-sm">
            <div className="grid gap-2 md:grid-cols-4">
              <input defaultValue={team.name} onBlur={(e) => handleFieldChange(team, 'name', e.target.value)} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={team.shortName} onBlur={(e) => handleFieldChange(team, 'shortName', e.target.value)} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={team.city} onBlur={(e) => handleFieldChange(team, 'city', e.target.value)} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={team.coach} onBlur={(e) => handleFieldChange(team, 'coach', e.target.value)} className="h-10 rounded-lg bg-zinc-800 px-3" />
            </div>
            {savingId === team.id ? <p className="mt-2 text-xs text-zinc-400">Сохранено</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
