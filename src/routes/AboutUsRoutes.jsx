import Loadable from "components/Loadable";
import { lazy } from "react";

const AboutUs = Loadable(lazy(() => import('pages/main/AboutUs')));

const AboutUsRoutes = {
    path: '/about-us',
    element: <AboutUs />
}

export default AboutUsRoutes;