import React, { Component } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    CardMedia,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import Navbar from 'components/main/Navbar';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: JSON.parse(localStorage.getItem("cart")) || [],
            total: 0,
            userDetails: {
                name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: ''
            },
            paymentDetails: {
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            }
        };

        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    componentDidMount() {
        this.calculateTotal(this.state.cartItems);
    }

    calculateTotal(items) {
        const newTotal = items.reduce((sum, item) => sum + item.bookPackagePrice * item.quantity, 0);
        this.setState({ total: newTotal });
    }

    handleInputChange(event, setStateKey) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            [setStateKey]: {
                ...prevState[setStateKey],
                [name]: value
            }
        }));
    }

    handleCheckout() {
        alert('Quá trình thanh toán được bắt đầu.');
        // Implement actual checkout process here
    }

    render() {
        const { cartItems, total, userDetails, paymentDetails } = this.state;

        return (
            <>
                <Navbar />
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Thanh Toán
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Cart Items Section */}
                        <Grid item xs={12} md={8}>
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Giỏ Hàng
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Hình ảnh</TableCell>
                                                <TableCell>Tên sách</TableCell>
                                                <TableCell>Đơn giá</TableCell>
                                                <TableCell>Số lượng</TableCell>
                                                <TableCell>Thành tiền</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <CardMedia
                                                            component="img"
                                                            image={item.bookCoverImg}
                                                            alt={item.bookTitle}
                                                            sx={{
                                                                width: 80,
                                                                height: 80,
                                                                objectFit: 'cover',
                                                                borderRadius: 1
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6">{item.bookTitle}</Typography>
                                                    </TableCell>
                                                    <TableCell>{item.bookPackagePrice} VND</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{item.bookPackagePrice * item.quantity} VND</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                            {/* User Details Section */}
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Thông Tin Người Dùng
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Họ và Tên"
                                            name="name"
                                            value={userDetails.name}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={userDetails.email}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Địa chỉ"
                                            name="address"
                                            value={userDetails.address}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Thành phố"
                                            name="city"
                                            value={userDetails.city}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Tỉnh"
                                            name="state"
                                            value={userDetails.state}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Mã bưu điện"
                                            name="zip"
                                            value={userDetails.zip}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Payment Details Section */}
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Chi Tiết Thanh Toán
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            label="Số thẻ"
                                            name="cardNumber"
                                            value={paymentDetails.cardNumber}
                                            onChange={(e) => this.handleInputChange(e, 'paymentDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Ngày hết hạn"
                                            name="expiryDate"
                                            value={paymentDetails.expiryDate}
                                            onChange={(e) => this.handleInputChange(e, 'paymentDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="CVV"
                                            name="cvv"
                                            value={paymentDetails.cvv}
                                            onChange={(e) => this.handleInputChange(e, 'paymentDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Checkout Button */}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={this.handleCheckout}
                                style={{ marginTop: 16 }}
                            >
                                Tiến Hành Thanh Toán
                            </Button>
                        </Grid>

                        {/* Summary Section */}
                        <Grid item xs={12} md={4}>
                            <Paper style={{ padding: 16, textAlign: 'center', marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Tổng cộng:
                                </Typography>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    style={{ color: '#ff5722' }} // Highlight color
                                >
                                    {total} VND
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}

export default Checkout;
