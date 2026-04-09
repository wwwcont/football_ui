import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AdminShell } from '../layouts/AdminShell';
import { AuthShell } from '../layouts/AuthShell';
import { PublicShell } from '../layouts/PublicShell';
import { useAdminSession } from '../hooks/useAdminSession';
import { LoginPage } from '../pages/auth/LoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminMatchCenterPage } from '../pages/admin/AdminMatchCenterPage';
import { AdminMatchesPage } from '../pages/admin/AdminMatchesPage';
import { AdminPlayersPage } from '../pages/admin/AdminPlayersPage';
import { AdminSchedulePage } from '../pages/admin/AdminSchedulePage';
import { AdminTeamsPage } from '../pages/admin/AdminTeamsPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { CabinetManagementTab, CabinetPage, CabinetProfileTab } from '../pages/public/CabinetPage';
import { HomePage } from '../pages/public/HomePage';
import { MatchDetailsPage } from '../pages/public/MatchDetailsPage';
import { MatchesPage } from '../pages/public/MatchesPage';
import { PlayerDetailsPage } from '../pages/public/PlayerDetailsPage';
import { PlayersPage } from '../pages/public/PlayersPage';
import { SearchPage } from '../pages/public/SearchPage';
import { StandingsPage } from '../pages/public/StandingsPage';
import { TeamDetailsPage } from '../pages/public/TeamDetailsPage';
import { TeamsPage } from '../pages/public/TeamsPage';
import { ForbiddenPage, NotFoundPage } from '../pages/system/SystemPages';

function AdminGuard() {
  const { isAuthenticated } = useAdminSession();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login?next=/admin" replace />;
}

function SessionGuard() {
  const { isAuthenticated } = useAdminSession();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login?next=/cabinet" replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<StandingsPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:matchId" element={<MatchDetailsPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:playerId" element={<PlayerDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        <Route element={<SessionGuard />}>
          <Route path="/cabinet" element={<CabinetPage />}>
            <Route index element={<CabinetProfileTab />} />
            <Route path="management" element={<CabinetManagementTab />} />
          </Route>
        </Route>
      </Route>

      <Route path="/admin/login" element={<AuthShell />}>
        <Route index element={<LoginPage />} />
      </Route>

      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="teams" element={<AdminTeamsPage />} />
          <Route path="players" element={<AdminPlayersPage />} />
          <Route path="matches" element={<AdminMatchesPage />} />
          <Route path="matches/:matchId/center" element={<AdminMatchCenterPage />} />
          <Route path="schedule" element={<AdminSchedulePage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
