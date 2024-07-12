import Loadable from "components/Loadable";
import { Children, lazy } from "react";


const Store = Loadable(lazy(() => import('pages/main/Store')));


const StoreRoutes = {
    path: '/store',
    children: [
        {
            path: '',
            element: <Store />
        }
    ]
};

export default StoreRoutes;
