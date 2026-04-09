import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { AdminRole } from '../../domain/models';
import { useAdminSession } from '../../hooks/useAdminSession';

type FormValues = { name: string; role: AdminRole };

export function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { name: 'Оператор', role: 'match_operator' } });
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
        <h1 className="text-xl font-semibold text-zinc-100">Вход в админ-панель</h1>
        <p className="text-sm text-zinc-400">Демо-авторизация для skeleton-режима</p>
      </div>
      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Имя</span>
        <input {...register('name', { required: true })} className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-zinc-300">Роль</span>
        <select {...register('role')} className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3">
          <option value="match_operator">Оператор матча</option>
          <option value="league_admin">Админ лиги</option>
          <option value="super_admin">Супер-админ</option>
        </select>
      </label>
      <button className="h-11 w-full rounded-lg bg-white text-sm font-medium text-zinc-900" type="submit">Войти</button>
    </form>
  );
}
