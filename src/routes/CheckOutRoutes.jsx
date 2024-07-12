import Loadable from "components/Loadable";
import { lazy } from "react";


const Checkout = Loadable(lazy(() => import('pages/main/Checkout')));

const CheckoutRoutes = {
    path: '/cart/checkout',
    element: <Checkout />,

}

export default CheckoutRoutes;