import { useMemo, useState } from 'react';

export function useMockAdminAuth() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('adminSession') === '1');
  const value = useMemo(
    () => ({
      loggedIn,
      login: () => {
        localStorage.setItem('adminSession', '1');
        setLoggedIn(true);
      },
      logout: () => {
        localStorage.removeItem('adminSession');
        setLoggedIn(false);
      },
    }),
    [loggedIn],
  );

  return value;
}
