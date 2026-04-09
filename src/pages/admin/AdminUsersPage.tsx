import { useAsyncData } from '../../hooks/useAsyncData';
import { mockRepository } from '../../repositories/mockRepository';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/PageState';
import type { AdminUser } from '../../domain/models';

export function AdminUsersPage() {
  const users = useAsyncData<AdminUser[]>(() => mockRepository.getAdminUsers(), []);

  if (users.isLoading) return <LoadingState />;
  if (users.error) return <ErrorState message={users.error} />;
  if (!users.data.length) return <EmptyState title="No admin users" />;

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Users" description="Admin roles and scopes" />
      <div className="space-y-2">
        {users.data.map((user) => (
          <div key={user.id} className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-zinc-600">{user.email} · {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
