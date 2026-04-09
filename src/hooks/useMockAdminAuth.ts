import { useMemo, useState } from 'react';

export type SessionRole = 'admin' | 'captain';
export type AdminSession = { role: SessionRole; userId: string };

const STORAGE_KEY = 'leagueSession';

const readSession = (): AdminSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
};

export function useMockAdminAuth() {
  const [session, setSession] = useState<AdminSession | null>(() => readSession());

  const value = useMemo(
    () => ({
      loggedIn: Boolean(session),
      session,
      login: (nextSession: AdminSession) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
      },
    }),
    [session],
  );

  return value;
}
