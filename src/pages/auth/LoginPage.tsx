import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { AdminRole } from '../../domain/models';
import { useAdminSession } from '../../hooks/useAdminSession';

type FormValues = { name: string; role: AdminRole };

export function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { name: 'Operator', role: 'match_operator' } });
  const { login } = useAdminSession();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = ({ name, role }: FormValues) => {
    login(name, role);
    navigate(params.get('next') || '/admin', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Admin sign in</h1>
        <p className="text-sm text-zinc-600">Mock session only</p>
      </div>
      <label className="block space-y-1 text-sm">
        <span>Name</span>
        <input {...register('name', { required: true })} className="h-11 w-full rounded-lg border border-zinc-300 px-3" />
      </label>
      <label className="block space-y-1 text-sm">
        <span>Role</span>
        <select {...register('role')} className="h-11 w-full rounded-lg border border-zinc-300 px-3">
          <option value="match_operator">Match operator</option>
          <option value="league_admin">League admin</option>
          <option value="super_admin">Super admin</option>
        </select>
      </label>
      <button className="h-11 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white" type="submit">Continue</button>
    </form>
  );
}
