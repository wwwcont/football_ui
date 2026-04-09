import { Navigate, Route, Routes } from 'react-router-dom';
import { useMockAdminAuth } from '../hooks/useMockAdminAuth';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminDashboardPage, AdminLoginPage } from '../pages/admin/AdminPages';
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

      <Route path="/login" element={auth.loggedIn ? <Navigate to="/cabinet" replace /> : <AdminLoginPage onLogin={auth.login} />} />
      <Route path="/cabinet" element={auth.loggedIn ? <AdminLayout onLogout={auth.logout} /> : <Navigate to="/login" replace />}>
        <Route index element={<AdminDashboardPage captainId={auth.captainId || ''} />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
