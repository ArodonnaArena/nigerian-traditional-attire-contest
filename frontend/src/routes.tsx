import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Contest from './pages/Contest';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';
import VotingSystemTest from './components/test/VotingSystemTest.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'contest',
        element: <Contest />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'test',
        element: <VotingSystemTest />,
      },
    ],
  },
]);
