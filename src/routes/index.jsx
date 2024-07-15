import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import StoreRoutes from './StoreRoutes';
import IntroRoutes from './information/IntroRoutes';
import PaymentPolicyRoutes from './information/PaymentPolicyRoutes';
import PrivacyPolicyRoutes from './information/PrivacyPolicyRoutes';
import TermOfUseRoutes from './information/TermOfUseRoutes';
import AboutUsRoutes from './AboutUsRoutes';
import CartRoutes from './CartRoutes';
import UserRoutes from './UserRoutes';
import RegisterRoutes from './RegisterRoutes';
import CheckoutRoutes from './CheckOutRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([

    // Main Routes
    MainRoutes,
    LoginRoutes,
    RegisterRoutes,
    HomeRoutes,
    StoreRoutes,
    AboutUsRoutes,
    CartRoutes,
    UserRoutes,
    CheckoutRoutes,

    // Info routes
    IntroRoutes,
    PaymentPolicyRoutes,
    PrivacyPolicyRoutes,
    TermOfUseRoutes,

], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
