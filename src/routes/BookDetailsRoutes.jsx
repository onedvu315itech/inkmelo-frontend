
import Loadable from "components/Loadable";
import { lazy } from "react";

const ProductDetail = Loadable(lazy(() => import('pages/main/ProductDetail')));

const ProductDetailRoutes = {
    path: 'store/product/:slug',
    element: <ProductDetail />

}

export default ProductDetailRoutes;