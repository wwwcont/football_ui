import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { AdminRole } from '../../domain/models';
import { useAdminSession } from '../../hooks/useAdminSession';

type FormValues = { name: string; role: AdminRole };

export function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { name: 'Администратор', role: 'super_admin' } });
  const { login } = useAdminSession();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminLoginRoute = location.pathname.startsWith('/admin');

  const onSubmit = ({ name, role }: FormValues) => {
    login(name, role);
    navigate(params.get('next') || '/admin', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl bg-zinc-900 p-5">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">{isAdminLoginRoute ? 'Вход в админ-панель' : 'Вход в аккаунт'}</h1>
        <p className="text-sm text-zinc-400">
          {isAdminLoginRoute
            ? 'Демо-авторизация для админского режима'
            : 'Войдите, чтобы перейти в кабинет и управлять данными турнира'}
        </p>
      </div>
      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Имя</span>
        <input {...register('name', { required: true })} className="h-11 w-full rounded-lg bg-zinc-800 px-3" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Роль</span>
        <select {...register('role')} className="h-11 w-full rounded-lg bg-zinc-800 px-3">
          <option value="match_operator">Оператор матча</option>
          <option value="league_admin">Админ лиги</option>
          <option value="super_admin">Супер-админ</option>
        </select>
      </label>
      <button className="h-11 w-full rounded-lg bg-[#6d2432] text-sm font-medium text-rose-50" type="submit">Войти</button>
    </form>
  );
}
