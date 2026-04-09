import { Navigate, Route, Routes } from 'react-router-dom';
import { useMockAdminAuth } from '../hooks/useMockAdminAuth';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminDashboardPage, AdminEventsPage, AdminLoginPage, AdminMatchResultEditorPage, AdminMatchesPage, AdminPlayersPage, AdminSchedulePage, AdminTeamsPage, AdminUsersPage } from '../pages/admin/AdminPages';
import { EventsPage, HomePage, MatchDetailsPage, MatchesPage, NotFound, PlayerDetailsPage, PlayersPage, SearchPage, TablePage, TeamDetailsPage, TeamsPage } from '../pages/public/PublicPages';

export function App() {
  const auth = useMockAdminAuth();
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:id" element={<MatchDetailsPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:id" element={<TeamDetailsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:id" element={<PlayerDetailsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage onLogin={auth.login} />} />
      <Route path="/admin" element={auth.loggedIn ? <AdminLayout onLogout={auth.logout} /> : <Navigate to="/admin/login" replace /> }>
        <Route index element={<AdminDashboardPage />} />
        <Route path="teams" element={<AdminTeamsPage />} />
        <Route path="players" element={<AdminPlayersPage />} />
        <Route path="matches" element={<AdminMatchesPage />} />
        <Route path="matches/:id/result" element={<AdminMatchResultEditorPage />} />
        <Route path="schedule" element={<AdminSchedulePage />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
