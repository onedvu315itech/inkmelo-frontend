import Loadable from "components/Loadable";
import { lazy } from "react";

const Intro = Loadable(lazy(() => import('../../pages/information/InkMeloIntroduction')));

const IntroRoutes = {
    path: '/inkmelo-introduction',
    element: <Intro />
}

export default IntroRoutes;