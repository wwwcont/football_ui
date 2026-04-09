import { useMemo, useState } from 'react';

export function useMockAdminAuth() {
  const [captainId, setCaptainId] = useState(() => localStorage.getItem('captainSession'));
  const value = useMemo(
    () => ({
      loggedIn: Boolean(captainId),
      captainId,
      login: (id: string) => {
        localStorage.setItem('captainSession', id);
        setCaptainId(id);
      },
      logout: () => {
        localStorage.removeItem('captainSession');
        setCaptainId(null);
      },
    }),
    [captainId],
  );

  return value;
}
