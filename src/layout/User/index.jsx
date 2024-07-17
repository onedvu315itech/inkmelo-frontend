import { Box, useMediaQuery } from "@mui/material";
import { handlerDrawerOpen, useGetMenuMaster } from "api/userMenu";
import UserBreadcrumbs from "components/@extended/UserBreadcrumbs";
import Loader from "components/Loader";
import Drawer from "./Drawer";
import navigation from 'menu-items/user';
import { useEffect, useState } from "react";
import Navbar from "components/main/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "components/main/Footer";

export default function UserLayout() {
    const { menuMasterLoading } = useGetMenuMaster();
    const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    useEffect(() => {
        handlerDrawerOpen(!downXL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downXL]);

    if (menuMasterLoading) return <Loader />;

    return (
        <>
            <Box sx={{ display: 'block', width: '100%' }}>
                <Navbar />
                <Drawer />
                <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 }, marginLeft: '16rem', marginTop: '-5rem' }}>
                    <UserBreadcrumbs navigation={navigation} title />
                    <Outlet />
                    <Footer />
                </Box>
            </Box>
        </>
    );
}