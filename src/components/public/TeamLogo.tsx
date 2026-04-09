import { useEffect, useState } from 'react';
import type { Team } from '../../domain/models';
import { getTeamLogo } from '../../lib/teamLogo';
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
      onError={() => {
        if (src !== FALLBACK_LOGO_URL) {
          setSrc(FALLBACK_LOGO_URL);
        }
      }}
    />
  );
}
