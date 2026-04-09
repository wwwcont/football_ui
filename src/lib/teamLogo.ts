import type { Team } from '../domain/models';
import { APP_LOGO_URL } from './logoAsset';

export const TOURNAMENT_LOGO_URL = APP_LOGO_URL;

export function getTeamLogo(team?: Pick<Team, 'logoUrl'> | null) {
  const logo = team?.logoUrl?.trim();
  return logo ? logo : TOURNAMENT_LOGO_URL;
}
