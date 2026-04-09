import { useEffect, useState } from 'react';
import type { Team } from '../../domain/models';
import { TOURNAMENT_LOGO_URL, getTeamLogo } from '../../lib/teamLogo';
import { FALLBACK_LOGO_URL } from '../../lib/logoAsset';

interface TeamLogoProps {
  team?: Pick<Team, 'logoUrl' | 'name' | 'shortName'> | null;
  className: string;
}

export function TeamLogo({ team, className }: TeamLogoProps) {
  const [src, setSrc] = useState(() => getTeamLogo(team));

  useEffect(() => {
    setSrc(getTeamLogo(team));
  }, [team]);

  return (
    <img
      src={src}
      alt={team?.name ?? 'Команда'}
      className={className}
      onError={() => setSrc(src === TOURNAMENT_LOGO_URL ? FALLBACK_LOGO_URL : TOURNAMENT_LOGO_URL)}
    />
  );
}
