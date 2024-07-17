import { useMemo } from "react";
import useSWR, { mutate } from "swr";

const initialState = {
    openedItem: 'user',
    openedComponent: 'buttons',
    openedHorizontalItem: null,
    isDashboardDrawerOpened: false,
    isComponentDrawerOpened: true
};

export const endpoints = {
    key: 'api/userMenu',
    master: 'master',
    account: '/user/account' // server URL
};

export function useGetMenuMaster() {
    const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const memoizedValue = useMemo(
        () => ({
            menuMaster: data,
            menuMasterLoading: isLoading
        }),
        [data, isLoading]
    );

    return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
    // to update local state based on key

    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster) => {
            return { ...currentMenuMaster, isDashboardDrawerOpened };
        },
        false
    );
}

export function handlerActiveItem(openedItem) {
    // to update local state based on key

    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster) => {
            return { ...currentMenuMaster, openedItem };
        },
        false
    );
}