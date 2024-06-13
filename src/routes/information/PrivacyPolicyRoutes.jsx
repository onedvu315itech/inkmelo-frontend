import Loadable from "components/Loadable";
import { lazy } from "react";

const PrivacyPolicy = Loadable(lazy(() => import('pages/information/PrivacyPolicy')));

const PrivacyPolicyRoutes = {
    path: '/privacy-policy',
    element: <PrivacyPolicy />
}

export default PrivacyPolicyRoutes;