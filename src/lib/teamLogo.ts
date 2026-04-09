import type { Team } from '../domain/models';

export const TOURNAMENT_LOGO_URL = '/icons/tournament-logo.svg';

export function getTeamLogo(team?: Pick<Team, 'logoUrl'> | null) {
  const logo = team?.logoUrl?.trim();
  return logo ? logo : TOURNAMENT_LOGO_URL;
}
