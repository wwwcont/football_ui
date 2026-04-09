import type { Team } from '../domain/models';
import { APP_LOGO_URL } from './logoAsset';

export const TOURNAMENT_LOGO_URL = APP_LOGO_URL;

function isValidLogoPath(value: string) {
  if (!value || value.length < 2) return false;
  if (value.startsWith('javascript:')) return false;
  if (value.startsWith('data:') && !value.startsWith('data:image/')) return false;

  if (value.startsWith('/')) return true;

  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function getTeamLogo(team?: Pick<Team, 'logoUrl'> | null) {
  const logo = team?.logoUrl?.trim() ?? '';
  return isValidLogoPath(logo) ? logo : TOURNAMENT_LOGO_URL;
}
