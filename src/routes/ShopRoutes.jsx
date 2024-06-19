import Loadable from "components/Loadable";
import { lazy } from "react";

const Store = Loadable(lazy(() => import('pages/main/Store')));

const StoreRoutes = {
    path: '/store',
    element: <Store />
}

export default StoreRoutes;