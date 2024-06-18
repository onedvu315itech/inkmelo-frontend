import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';


const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// main section
const Category = Loadable(lazy(() => import('pages/admin/Category')));
const Genre = Loadable(lazy(() => import('pages/admin/Genre')));
const Publisher = Loadable(lazy(() => import('pages/admin/Publisher')));
const User = Loadable(lazy(() => import('pages/admin/User')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/admin',
  element: <Dashboard />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'category',
      element: <Category />
    },
    {
      path: 'genre',
      element: <Genre />
    },
    {
      path: 'publisher',
      element: <Publisher />
    },
    {
      path: 'user',
      element: <User />
    },
  ]
};

export default MainRoutes;
