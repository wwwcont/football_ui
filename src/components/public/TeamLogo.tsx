import { useEffect, useState } from 'react';
import type { Team } from '../../domain/models';
import { getTeamLogo } from '../../lib/teamLogo';
import { FALLBACK_LOGO_URL } from '../../lib/logoAsset';
import { cn } from '../../lib/format';

interface TeamLogoProps {
  team?: Pick<Team, 'logoUrl' | 'name' | 'shortName'> | null;
  className?: string;
  imgClassName?: string;
}

export function TeamLogo({ team, className, imgClassName }: TeamLogoProps) {
  const [src, setSrc] = useState(() => getTeamLogo(team));

  useEffect(() => {
    setSrc(getTeamLogo(team));
  }, [team]);

  return (
    <span className={cn('logo-shell shrink-0', className)}>
      <img
        src={src}
        alt={team?.name ?? 'Команда'}
        className={cn('h-full w-full object-cover p-0.5', imgClassName)}
        onError={() => {
          if (src !== FALLBACK_LOGO_URL) {
            setSrc(FALLBACK_LOGO_URL);
          }
        }}
      />
    </span>
  );
}
