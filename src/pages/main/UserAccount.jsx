import { Typography } from "@mui/material";
import UserMainCard from "components/UserMainCard";

const UserAccount = () => {
    return (
        <>
            <UserMainCard>
                <Typography variant="body2">
                    Welcome user account
                </Typography>
            </UserMainCard>
        </>
    );
}

export default UserAccount;