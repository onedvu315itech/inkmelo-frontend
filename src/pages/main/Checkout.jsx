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
    TableRow,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import cartServices from 'services/cartServices';
import Navbar from 'components/main/Navbar';
import Footer from 'components/main/Footer';
import checkoutServices from 'services/checkoutServices';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            total: 0,
            userDetails: {
                name: '',
                phoneNumber: '',
                description: '',
                address: '',
                ward: '',
                district: '',
                city: '',
                state: '',
                zip: '',
                districtId: '',
            },
            shippingMethod: 'Giao hàng nhanh',
            paymentMethod: 'VNPay',
            shippingServices: [], // Initialize shipping services
            selectedShippingService: '',
            shippingFee: null,
            shippingDate: null
        };

        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleShippingChange = this.handleShippingChange.bind(this);
    }

    async componentDidMount() {
        try {
            const username = sessionStorage.getItem('username');
            let resCart = await cartServices.getAllCart(username);
            if (resCart) {
                console.log(resCart.data);
                let data = resCart.data;
                this.setState({ cartItems: data }, () => {
                    this.calculateTotal(this.state.cartItems);
                });
            }

            let resUserInfo = await checkoutServices.getUserInfor(username);
            if (resUserInfo) {
                console.log(resUserInfo.data);
                let userInfo = resUserInfo.data[0];
                this.setState({
                    userDetails: {
                        name: userInfo.receiverName,
                        phoneNumber: userInfo.contactNumber,
                        description: userInfo.description,
                        address: userInfo.street,
                        ward: userInfo.ward,
                        district: userInfo.district,
                        city: userInfo.province,
                        state: userInfo.state,
                        zip: userInfo.wardCode,
                        districtId: userInfo.districtId
                    }

                })

            }

            // Fetch shipping services
            console.log(this.state.userDetails);
            let resShippingServices = await checkoutServices.getShipServices(JSON.parse(resUserInfo.data[0].districtId));
            if (resShippingServices) {
                console.log(resShippingServices.data);
                this.setState({ shippingServices: resShippingServices.data });
                // Set default selected shipping service
                this.setState({ selectedShippingService: resShippingServices.data.data[0].service_id });
                this.handleShippingChange({ target: { value: resShippingServices.data.data[0].service_id } });
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    calculateTotal(items) {
        const newTotal = items.reduce((sum, item) => sum + item.bookPackagePrice * item.quantity, 0);
        this.setState({ total: newTotal });
    }

    handleInputChange(event, setStateKey) {
        const { name, value } = event.target;
        this.setState({ [setStateKey]: value });
    }

    async handleShippingChange(event) {
        const serviceId = event.target.value;
        this.setState({ selectedShippingService: serviceId });

        // Fetch shipping fee and date based on selected service
        let resShippingFee = await checkoutServices.calculateShippingFee(serviceId);
        if (resShippingFee) {
            console.log(resShippingFee.data);
            this.setState({ shippingFee: resShippingFee.data });
        }

        let resShippingDate = await checkoutServices.getShippingDate(serviceId);
        if (resShippingDate) {
            console.log(resShippingDate.data);
            this.setState({ shippingDate: resShippingDate.data });
        }
    }

    handleCheckout() {
        alert('Quá trình thanh toán được bắt đầu.');
        // Implement actual checkout process here
    }

    render() {
        const { cartItems, total, userDetails, shippingMethod, paymentMethod, shippingServices, selectedShippingService, shippingFee, shippingDate } = this.state;

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
                                                                width: 90,
                                                                height: 120,
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
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Số điện thoại"
                                            name="phoneNumber"
                                            value={userDetails.phoneNumber}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Loại địa chỉ"
                                            name="description"
                                            value={userDetails.description}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Địa chỉ cụ thể"
                                            name="address"
                                            value={userDetails.address}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Phường"
                                            name="ward"
                                            value={userDetails.ward}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Quận/Huyện"
                                            name="district"
                                            value={userDetails.district}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Tỉnh/Thành phố"
                                            name="city"
                                            value={userDetails.city}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Mã bưu điện"
                                            name="zip"
                                            value={userDetails.zip}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Shipping and Payment Methods Section */}
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Phương thức vận chuyển và thanh toán
                                </Typography>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Phương thức vận chuyển</FormLabel>
                                    <RadioGroup
                                        aria-label="shippingMethod"
                                        name="shippingMethod"
                                        value={shippingMethod}
                                        onChange={(e) => this.handleInputChange(e, 'shippingMethod')}
                                    >
                                        <FormControlLabel
                                            value="Giao hàng nhanh"
                                            control={<Radio />}
                                            label={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="https://th.bing.com/th/id/OIP.c5c8IJ-xjS9KlDcifZXU0wHaHa?rs=1&pid=ImgDetMain" alt="Giao hàng nhanh" style={{ width: 50, height: 50, marginRight: 8 }} />
                                                    <div>
                                                        <Typography variant="subtitle1">Giao hàng nhanh</Typography>
                                                        <div style={{ textAlign: 'left', paddingLeft: 58 }}>

                                                            <p>Tổng giá tiền đơn hàng: {total} VND</p>
                                                            <p>Phí vận chuyển: {shippingFee !== null ? shippingFee.total : "Đang tính toán"} VND</p>
                                                            <p>Tổng giá tiền đơn hàng: {total + (shippingFee !== null ? shippingFee.total : 0)} VND</p>
                                                            <p>Dự kiến ngày giao hàng: {shippingDate !== null ? shippingDate : "Đang tính toán"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset" style={{ marginTop: 16 }}>
                                    <FormLabel component="legend">Phương thức thanh toán</FormLabel>
                                    <RadioGroup
                                        aria-label="paymentMethod"
                                        name="paymentMethod"
                                        xs={10}
                                        value={paymentMethod}
                                        onChange={(e) => this.handleInputChange(e, 'paymentMethod')}
                                    >
                                        <FormControlLabel value="VNPay" control={<Radio />} label="VNPay" />
                                    </RadioGroup>
                                </FormControl>
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
                                    style={{ color: '#ff5722' }}
                                >
                                    {total} VND
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </>
        );
    }
}

export default Checkout;
