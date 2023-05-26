import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import FollowPage from '../pages/FollowPage';
import Layout from '../pages/Layout';
import LoginPage from '../pages/LoginPage';
import PostPage from '../pages/PostPage';
import ProfilePage from '../pages/ProfilePage';

const AccountPage = lazy(() => import('../pages/AccountPage'));
const ActivityPage = lazy(() => import('../pages/ActivityPage'));
const GlobalPage = lazy(() => import('../pages/GlobalPage'));

/**
 * Holds the path for all routes within the application
 */
export const buildRoutes = (isAuthenticated: boolean): RouteObject[] => {
  if (isAuthenticated) {
    return [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <GlobalPage /> },
          { path: 'activity', element: <ActivityPage /> },
          { path: 'post/:id', element: <PostPage /> },
          { path: 'account', element: <AccountPage /> },
          { path: 'profile/:id', element: <ProfilePage /> },
          { path: 'account/followers', element: <FollowPage follower={true} /> },
          { path: 'account/following', element: <FollowPage follower={false} /> },
        ],
      },
    ];
  } else {
    return [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to='/' />,
      },
    ];
  }
};
