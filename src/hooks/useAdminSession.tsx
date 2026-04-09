import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AdminRole, AdminSession } from '../domain/models';

const storageKey = 'football_ui_admin_session';

interface AdminSessionContextValue {
  session: AdminSession | null;
  isAuthenticated: boolean;
  login: (name: string, role: AdminRole) => void;
  logout: () => void;
}

const AdminSessionContext = createContext<AdminSessionContextValue | undefined>(undefined);

function readSession(): AdminSession | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => readSession());

  useEffect(() => {
    const syncSession = (event: StorageEvent) => {
      if (event.key === storageKey) {
        setSession(readSession());
      }
    };

    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
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

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session],
  );

  return <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>;
}

export function useAdminSession() {
  const context = useContext(AdminSessionContext);
  if (!context) {
    throw new Error('useAdminSession must be used inside AdminSessionProvider');
  }
  return context;
}
