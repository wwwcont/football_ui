import { Outlet } from 'react-router-dom';
import { BottomNav, DesktopTopbar } from '../components/layout/Nav';

export function PublicLayout() {
  return (
    <div>
      <DesktopTopbar />
      <main><Outlet /></main>
      <BottomNav />
    </div>
  );
}
