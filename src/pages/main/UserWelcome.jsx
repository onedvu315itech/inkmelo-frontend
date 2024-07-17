import { Typography } from "@mui/material";
import UserMainCard from "components/UserMainCard";

const UserOrder = () => {
    const username = sessionStorage.getItem('username');
    return (
        <UserMainCard>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
                Chào mừng {username} đến với <span style={{ color: 'rgb(220,120,0)' }}>InkMelo.</span>
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 500 }}>
                Hãy khám phá kho tàng tri thức <span style={{ color: 'rgb(220,120,0)' }}>InkMelo.</span>
            </Typography>
        </UserMainCard>
    );
}

export default UserOrder;