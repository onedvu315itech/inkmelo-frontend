import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import ShopRoutes from './ShopRoutes';
import IntroRoutes from './information/IntroRoutes';
import PaymentPolicyRoutes from './information/PaymentPolicyRoutes';
import PrivacyPolicyRoutes from './information/PrivacyPolicyRoutes';
import TermOfUseRoutes from './information/TermOfUseRoutes';
import AboutUsRoutes from './AboutUsRoutes';
import CartRoutes from './CartRoutes';
import UserRoutes from './UserRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([

    // Main Routes
    MainRoutes,
    LoginRoutes,
    HomeRoutes,
    ShopRoutes,
    AboutUsRoutes,
    CartRoutes,
    UserRoutes,

    // Info routes
    IntroRoutes,
    PaymentPolicyRoutes,
    PrivacyPolicyRoutes,
    TermOfUseRoutes,

], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
