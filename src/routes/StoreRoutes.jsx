import Loadable from "components/Loadable";
import { lazy } from "react";

const Store = Loadable(lazy(() => import('pages/main/Store')));
const ProductDetails = Loadable(lazy(() => import('pages/main/ProductDetail')));

const StoreRoutes = {
    path: '/store',
    children: [
        {
            path: '',
            element: <Store />
        },
        {
            path: 'product/:slug',
            element: <ProductDetails />
        }
    ]
};

export default StoreRoutes;
