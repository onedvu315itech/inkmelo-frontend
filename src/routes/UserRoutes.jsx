import Loadable from "components/Loadable";
import { lazy } from "react";

const User = Loadable(lazy(() => import('pages/main/User')));

const UserRoutes = {
    path: '/user',
    element: <User />
}

export default UserRoutes;