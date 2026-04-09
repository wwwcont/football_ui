import { useEffect, useMemo, useState } from 'react';
import type { AdminRole, AdminSession } from '../domain/models';

const storageKey = 'football_ui_admin_session';

function readSession(): AdminSession | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function useAdminSession() {
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  const login = (name: string, role: AdminRole) => {
    const next: AdminSession = { userId: `mock-${name.toLowerCase()}`, name, role };
    localStorage.setItem(storageKey, JSON.stringify(next));
    setSession(next);
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setSession(null);
  };

  return useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session],
  );
}
