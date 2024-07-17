import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import UserMainCard from "components/UserMainCard";

const DisplayShipment = ({ shipment }) => {
    return (
        <UserMainCard>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6"><strong>Tên người nhận:</strong> {shipment.receiverName}</Typography>
                            <Typography variant="h6"><strong>Số điện thoại:</strong> {shipment.contactNumber}</Typography>
                            <Typography variant="h6"><strong>Loại địa chỉ:</strong> {shipment.description}</Typography>
                            <Box sx={{ display: 'block', p: 2, border: '2px solid maroon', borderRadius: '5px' }}>
                                <Typography variant="h6"><strong>Tỉnh/Thành phố:</strong> {shipment.province}</Typography>
                                <Typography variant="h6"><strong>Quận/Huyện:</strong> {shipment.district}</Typography>
                                <Typography variant="h6"><strong>Phường/Xã:</strong> {shipment.ward}</Typography>
                                <Typography variant="h6"><strong>Địa chỉ cụ thể:</strong> {shipment.street}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </UserMainCard>
    );
};

export default DisplayShipment;