import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { AdminRole } from '../../domain/models';
import { useAdminSession } from '../../hooks/useAdminSession';
import { APP_LOGO_URL } from '../../lib/logoAsset';

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
    const defaultPath = isAdminLoginRoute ? '/admin' : '/cabinet';
    navigate(params.get('next') || defaultPath, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel-matte space-y-4 rounded-3xl p-5">
      <div className="flex items-start gap-3">
        <span className="logo-shell h-12 w-12 rounded-xl">
          <img src={APP_LOGO_URL} alt="Tournament" className="h-full w-full rounded-xl p-1.5" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">{isAdminLoginRoute ? 'Вход в админ-панель' : 'Вход в аккаунт'}</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {isAdminLoginRoute
              ? 'Демо-авторизация для админского режима'
              : 'Войдите, чтобы открыть кабинет и сохранить сессию во всех public разделах'}
          </p>
        </div>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Имя</span>
        <input {...register('name', { required: true })} className="panel-soft h-11 w-full rounded-xl px-3 text-zinc-100 focus:border-[#a23a50]/50 focus:outline-none" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Роль</span>
        <select {...register('role')} className="panel-soft h-11 w-full rounded-xl px-3 text-zinc-100 focus:border-[#a23a50]/50 focus:outline-none">
          <option value="match_operator">Оператор матча</option>
          <option value="league_admin">Админ лиги</option>
          <option value="super_admin">Супер-админ</option>
        </select>
      </label>
      <button className="accent-badge h-11 w-full rounded-xl text-sm font-semibold" type="submit">Войти</button>
    </form>
  );
}
