import userMenuItems from "menu-items/user";
import UserNavGroup from "./UserNavGroup";
import { Box, Typography } from "@mui/material";

export default function Navigation() {
    const navGroups = userMenuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <UserNavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}