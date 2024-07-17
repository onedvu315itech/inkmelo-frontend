import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid } from "@mui/material";
import UserMainCard from "components/UserMainCard";
import orderServices from "services/orderServices";

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = sessionStorage.getItem('username');

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const resOrders = await orderServices.getUserOrders(username);
                if (resOrders) {
                    setOrders(resOrders.data.items);
                }
            } catch (error) {
                console.error("Failed to fetch user orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    return (
        <UserMainCard>

            <Typography variant="h5" gutterBottom>
                Đơn hàng của bạn
            </Typography>
            {loading ? (
                <Typography>Đang tải...</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Giá đơn hàng</TableCell>
                                <TableCell>Phí Vận chuyển</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Tình trạng</TableCell>
                                <TableCell>Thời gian</TableCell>
                                <TableCell>Chi tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            orders && orders.length > 0 ?
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.ghnOrderCode || 'N/A'}</TableCell>
                                            <TableCell>{order.orderPrice.toLocaleString()} VNĐ</TableCell>
                                            <TableCell>{order.shippingFee.toLocaleString()} VNĐ</TableCell>
                                            <TableCell>{order.totalPrice.toLocaleString()} VNĐ</TableCell>
                                            <TableCell>{order.ghnOrderStatus || 'Pending'}</TableCell>
                                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {order.detail.map((detailItem) => (
                                                    <Card key={detailItem.id} sx={{ mb: 2 }}>
                                                        <CardContent>
                                                            <Avatar variant="square" src={detailItem.bookPackage.book.bookCoverImg} alt={detailItem.bookPackage.book.title} sx={{ width: 64, height: 64, mt: 1 }} />
                                                            <Typography variant="body1">
                                                                {detailItem.bookPackage.book.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Tác Giả: {detailItem.bookPackage.book.author}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Số lượng: {detailItem.quantity}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Giá sản phẩm: {detailItem.itemPrice.toLocaleString()} VNĐ
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Tổng tiền: {detailItem.totalPrice.toLocaleString()} VNĐ
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                :
                                <Grid sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" gutterBottom>Bạn chưa có đơn hàng nào</Typography>
                                </Grid>
                        }
                    </Table>
                </TableContainer>
            )}
        </UserMainCard>
    );
}

export default UserOrder;
