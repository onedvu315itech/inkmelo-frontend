import Loadable from "components/Loadable";
import { lazy } from "react";

const Home = Loadable(lazy(() => import('pages/main/Home')));

const HomeRoutes = {
    path: '/',
    element: <Home />
}

export default HomeRoutes;