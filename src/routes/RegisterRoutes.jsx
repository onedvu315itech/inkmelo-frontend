import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

// render - login
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const RegisterRoutes = {
    path: '/register',
    element: <AuthRegister />
};

export default RegisterRoutes;
