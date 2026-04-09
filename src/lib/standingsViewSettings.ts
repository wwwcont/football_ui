export type StandingsViewMode = 'table' | 'grid';

export interface StandingsViewSettings {
  defaultView: StandingsViewMode;
  gridColumns: number;
}

const STORAGE_KEY = 'football_ui.standings_view_settings';

const defaultSettings: StandingsViewSettings = {
  defaultView: 'table',
  gridColumns: 1,
};

function clampColumns(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(3, Math.max(1, Math.round(value)));
}

export function getStandingsViewSettings(): StandingsViewSettings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;

    const parsed = JSON.parse(raw) as Partial<StandingsViewSettings>;
    return {
      defaultView: parsed.defaultView === 'grid' ? 'grid' : 'table',
      gridColumns: clampColumns(parsed.gridColumns ?? 1),
    };
  } catch {
    return defaultSettings;
  }
}

export function saveStandingsViewSettings(settings: StandingsViewSettings) {
  if (typeof window === 'undefined') {
    return;
  }

  const safeSettings: StandingsViewSettings = {
    defaultView: settings.defaultView === 'grid' ? 'grid' : 'table',
    gridColumns: clampColumns(settings.gridColumns),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeSettings));
}
