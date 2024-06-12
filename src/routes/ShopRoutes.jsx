import Loadable from "components/Loadable";
import { lazy } from "react";

const Shop = Loadable(lazy(() => import('pages/main/Shop')));

const ShopRoutes = {
    path: '/shop',
    element: <Shop />
}

export default ShopRoutes;