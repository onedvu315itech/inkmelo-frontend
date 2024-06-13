import Loadable from "components/Loadable";
import { lazy } from "react";

const PaymentPolicy = Loadable(lazy(() => import('pages/information/PaymentPolicy')));

const PaymentPolicyRoutes = {
    path: '/payment-policy',
    element: <PaymentPolicy />
}

export default PaymentPolicyRoutes;