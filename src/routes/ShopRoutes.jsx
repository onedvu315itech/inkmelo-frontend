import Loadable from "components/Loadable";
import { lazy } from "react";

const Store = Loadable(lazy(() => import('pages/main/Store')));
const ProductDetail = Loadable(lazy(() => import('pages/main/ProductDetail')));

const StoreRoutes = {
    path: '/store',
    element: <Store />,
    children: [
        {
            path: 'product/:slug',
            element: <ProductDetail />
        }
    ]
};

export default StoreRoutes;
