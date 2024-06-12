import Loadable from "components/Loadable";
import { lazy } from "react";

const Cart = Loadable(lazy(() => import('pages/main/Cart')));

const CartRoutes = {
    path: '/cart',
    element: <Cart />
}

export default CartRoutes;