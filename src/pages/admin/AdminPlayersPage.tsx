import { useState } from 'react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import { usePlayers } from '../../hooks/usePlayers';
import { mockRepository } from '../../repositories/mockRepository';
import type { Player } from '../../domain/models';

export function AdminPlayersPage() {
  const players = usePlayers();
  const [savingId, setSavingId] = useState<string | null>(null);
  if (players.isLoading) return <LoadingState />;
  if (players.error) return <ErrorState message={players.error} />;
  if (!players.data.length) return <EmptyState title="Игроков нет" />;

  const updatePlayer = async (player: Player, patch: Partial<Player>) => {
    setSavingId(player.id);
    await mockRepository.updatePlayer({ ...player, ...patch });
    setSavingId(null);
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Игроки" description="Редактирование составов и статистики" />
      <div className="space-y-2">
        {players.data.map((player) => (
          <div key={player.id} className="rounded-xl bg-zinc-900 p-3 text-sm">
            <div className="grid gap-2 md:grid-cols-4">
              <input defaultValue={player.displayName} onBlur={(e) => updatePlayer(player, { displayName: e.target.value })} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={player.position} onBlur={(e) => updatePlayer(player, { position: e.target.value as Player['position'] })} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={player.stats.goals} type="number" onBlur={(e) => updatePlayer(player, { stats: { ...player.stats, goals: Number(e.target.value) } })} className="h-10 rounded-lg bg-zinc-800 px-3" />
              <input defaultValue={player.stats.assists} type="number" onBlur={(e) => updatePlayer(player, { stats: { ...player.stats, assists: Number(e.target.value) } })} className="h-10 rounded-lg bg-zinc-800 px-3" />
            </div>
            {savingId === player.id ? <p className="mt-2 text-xs text-zinc-400">Сохранено</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
