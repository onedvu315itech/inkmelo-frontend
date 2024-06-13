import Loadable from "components/Loadable";
import { lazy } from "react";

const TermOfUse = Loadable(lazy(() => import('pages/information/TermOfUse')));

const TermOfUseRoutes = {
    path: '/terms-of-use',
    element: <TermOfUse />
}

export default TermOfUseRoutes;