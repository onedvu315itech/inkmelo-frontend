import Loadable from "components/Loadable";
import UserLayout from "layout/User";
import { lazy } from "react";

const UserAccount = Loadable(lazy(() => import('pages/main/UserAccount')));
const UserOrder = Loadable(lazy(() => import('pages/main/UserOrder')));
const UserWelcome = Loadable(lazy(() => import('pages/main/UserWelcome')));

const UserRoutes = {
    path: '/user',
    element: <UserLayout />,
    children: [
        {
            path: '',
            element: <UserWelcome />
        },
        {
            path: 'account',
            element: <UserAccount />
        },
        {
            path: 'my-order',
            element: <UserOrder />
        }
    ]
}

export default UserRoutes;