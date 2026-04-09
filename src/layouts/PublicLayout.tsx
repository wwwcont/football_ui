import { Outlet } from 'react-router-dom';
import { BottomNav, DesktopTopbar, MobileThemeAction } from '../components/layout/Nav';

export function PublicLayout() {
  return (
    <div>
      <DesktopTopbar />
      <main><Outlet /></main>
      <MobileThemeAction />
      <BottomNav />
    </div>
  );
}
