import { useAsyncData } from '../../hooks/useAsyncData';
import { mockRepository } from '../../repositories/mockRepository';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import type { AdminUser } from '../../domain/models';

export function AdminUsersPage() {
  const users = useAsyncData<AdminUser[]>(() => mockRepository.getAdminUsers(), []);

  if (users.isLoading) return <LoadingState />;
  if (users.error) return <ErrorState message={users.error} />;
  if (!users.data.length) return <EmptyState title="Админ-пользователи не найдены" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Пользователи" description="Роли и доступы" />
      <div className="space-y-2">
        {users.data.map((user) => (
          <div key={user.id} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-zinc-400">{user.email} · {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
