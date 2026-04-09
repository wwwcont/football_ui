export const APP_LOGO_URL = '/icons/tournament-logo.svg';
export const FALLBACK_LOGO_URL = '/icons/tournament-logo.svg';

export function resolveLogo(url?: string | null) {
  const value = url?.trim();
  return value ? value : APP_LOGO_URL;
}
