import React, { useState, useEffect } from 'react';
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
    Select,
    MenuItem,
} from '@mui/material';
import cartServices from 'services/cartServices';
import Navbar from 'components/main/Navbar';
import Footer from 'components/main/Footer';
import checkoutServices from 'services/checkoutServices';
import { Stars } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [listOfShipments, setListOfShipments] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('Giao hàng nhanh');
    const [paymentMethod, setPaymentMethod] = useState('VNPay');
    const [userDetails, setUserDetails] = useState({
        id: '',
        idFixed: '',
        name: '',
        phoneNumber: '',
        description: '',
        street: '',
        ward: '',
        wardCode: '',
        district: '',
        districtId: '',
        province: '',
        provinceId: '',
        isDefault: ''
    });

    const [loading, setLoading] = useState(false);
    const [startCheckout, setStartCheckout] = useState(true);
    const [complete1, setComplete1] = useState(false);
    const [complete2, setComplete2] = useState(false);

    const [shipServices, setShipServices] = useState(null);
    const [selectedShipService, setSelectedShipService] = useState('');
    const [shippingFee, setShippingFee] = useState(null);
    const [shippingDate, setShippingDate] = useState(null);
    const [totalFee, setTotalFee] = useState(0);

    const username = sessionStorage.getItem('username');

    // Fetch data to get infor about cart, shipment
    useEffect(() => {
        async function fetchData() {
            try {
                let resCart = await cartServices.getAllCart(username);
                if (resCart && resCart.data) {
                    setCartItems(resCart.data);
                    calculateTotal(resCart.data);
                }

                let resOfListShipments = await checkoutServices.getUserInfor(username);
                if (resOfListShipments && resOfListShipments.data) {
                    setListOfShipments(resOfListShipments.data);
                }

                let resUserInfo = await checkoutServices.getUserDefaultInfor(username);
                if (resUserInfo && resUserInfo.data) {
                    const userInfo = resUserInfo.data.data;
                    setUserDetails({
                        id: userInfo.id,
                        idFixed: userInfo.id,
                        name: userInfo.receiverName,
                        phoneNumber: userInfo.contactNumber,
                        description: userInfo.description,
                        street: userInfo.street,
                        ward: userInfo.ward,
                        wardCode: userInfo.wardCode,
                        district: userInfo.district,
                        districtId: userInfo.districtId,
                        province: userInfo.province,
                        provinceId: userInfo.provinceId,
                        isDefault: userInfo.isDefault
                    });
                    setComplete1(true);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        if (startCheckout) fetchData();
    }, [startCheckout]);

    // Fetch data to get information about ship services
    useEffect(() => {
        async function fetchShipServices() {
            try {
                let resShipServices = await checkoutServices.getShipServices(userDetails.districtId);
                if (resShipServices && resShipServices.data) {
                    setShipServices(resShipServices.data);
                    setSelectedShipService(resShipServices.data.data[0].service_id);
                    setComplete2(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (complete1) fetchShipServices();
    }, [userDetails, complete1]);

    // Fetch data to get fee and date for shipping
    useEffect(() => {
        async function fetchShippingFee() {
            try {
                let data = {
                    toDistrictId: userDetails.districtId,
                    toWardCode: userDetails.wardCode,
                    quantity: cartItems.length,
                    serviceId: selectedShipService
                }
                let resOfFee = await checkoutServices.getShippingFee(data);
                if (resOfFee && resOfFee.data) {
                    setShippingFee(resOfFee.data.data.total);
                }
            } catch (error) {
                console.log(error)
            }
        }

        async function fetchShippingDate() {
            try {
                let data = {
                    toDistrictId: userDetails.districtId,
                    toWardCode: userDetails.wardCode,
                    serviceId: selectedShipService
                }
                let resOfDate = await checkoutServices.getShippingDate(data);
                if (resOfDate && resOfDate.data) {
                    setShippingDate(resOfDate.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (complete1 && complete2) {
            fetchShippingFee();
            fetchShippingDate();
            setTotalFee(total + (shippingFee !== null ? shippingFee : 0));
        }
    }, [userDetails, cartItems, selectedShipService, complete1, complete2])

    const calculateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => sum + item.bookPackagePrice * item.quantity, 0);
        setTotal(newTotal);
    };

    const handleInputChange = (event, setStateKey) => {
        const { value } = event.target;
        switch (setStateKey) {
            case 'shippingMethod':
                setShippingMethod(value);
                break;
            case 'paymentMethod':
                setPaymentMethod(value);
                break;
            default:
                break;
        }
    };

    const handleChangeAddress = (event) => {
        let shipmentId = event.target.value;
        console.log(description)
    }

    const handleCheckout = async () => {
        let paymentUrl = '';
        let orderData = {
            totalPrice: totalFee,
            shippingFee: shippingFee,
            quantity: cartItems.length,
            shipmentId: userDetails.id,
            items: cartItems.map(item => item.id),
            serviceId: selectedShipService,
            redirectUrl: '/store'
        }

        console.log(orderData);

        let resOfCreateOrder = await checkoutServices.createOrder(username, orderData);
        if (resOfCreateOrder) {
            paymentUrl = resOfCreateOrder.data.paymentUrl;
            setLoading(true);
            toast.loading('Đang chuyển hướng đến trang thanh toán');
            setTimeout(() => {
                setLoading(false);
                toast.dismiss();
                window.location.href = paymentUrl;
            }, 3000);
        }
    };

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: 20 + 'px' }}>
                <Typography variant="h4" gutterBottom>
                    Thanh Toán
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Paper style={{ padding: 16, marginBottom: 16 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                Sản phẩm
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
                                        {cartItems && cartItems.map((item, index) => (
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
                                                <TableCell>{item.bookPackagePrice.toLocaleString('vi-VN')} VND</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{(item.bookPackagePrice * item.quantity).toLocaleString('vi-VN')} VND</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ padding: 16, marginBottom: 16 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                Thông Tin Người Nhận
                            </Typography>
                            <Grid sx={{ marginBottom: 20 + 'px' }}>
                                <Select
                                    value={userDetails.id || ''}
                                    onChange={(event) => handleChangeAddress(event)}
                                >
                                    {
                                        listOfShipments.map((shipment, key) => {
                                            return (
                                                <MenuItem key={key} value={shipment.id}>
                                                    {shipment.receiverName && shipment.receiverName + ' --- '}
                                                    {shipment.contactNumber && shipment.contactNumber + ' --- '}
                                                    {shipment.street && shipment.street + ', '}
                                                    {shipment.ward && shipment.ward + ', '}{shipment.district && shipment.district + ', '}
                                                    {shipment.province && shipment.province}
                                                    {shipment.id === userDetails.idFixed && <Stars color="info" />}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Grid>
                            {
                                userDetails.isDefault ?
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Họ và Tên"
                                                name="name"
                                                value={userDetails.name}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Số điện thoại"
                                                name="phoneNumber"
                                                value={userDetails.phoneNumber}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Loại địa chỉ"
                                                name="description"
                                                value={userDetails.description}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Địa chỉ cụ thể"
                                                name="street"
                                                value={userDetails.street}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Phường"
                                                name="ward"
                                                value={userDetails.ward}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Quận/Huyện"
                                                name="district"
                                                value={userDetails.district}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Tỉnh/Thành phố"
                                                name="province"
                                                value={userDetails.province}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                label="Mã bưu điện"
                                                name="wardCode"
                                                value={userDetails.wardCode}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                                sx={{ bgcolor: '#ECECEC' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid>

                                    </Grid>
                            }
                        </Paper>

                        {/* Shipping and Payment Methods Section */}
                        <Paper style={{ padding: 16, marginBottom: 16 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                Phương thức vận chuyển và thanh toán
                            </Typography>
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                            Vận chuyển
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="shippingMethod"
                                                name="shippingMethod"
                                                value={shippingMethod}
                                                onChange={(event) => handleInputChange(event, 'shippingMethod')}
                                            >
                                                <FormControlLabel
                                                    value="Giao hàng nhanh"
                                                    control={<Radio />}
                                                    label={
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src="https://th.bing.com/th/id/OIP.c5c8IJ-xjS9KlDcifZXU0wHaHa?rs=1&pid=ImgDetMain" alt="Giao hàng nhanh" style={{ width: 50, height: 50, marginRight: 8 }} />
                                                            <Typography variant="subtitle1">Giao hàng nhanh</Typography>
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                            <div style={{ marginLeft: '2rem', marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <Typography component="div" variant="body2" sx={{ fontSize: '0.875rem', display: 'flex' }}>
                                                        Tổng giá tiền đơn hàng:
                                                        <Typography component="div" variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', marginLeft: '6rem' }}>
                                                            {total.toLocaleString('vi-VN')} VND
                                                        </Typography>
                                                    </Typography>
                                                </div>
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <Typography component="div" variant="body2" sx={{ fontSize: '0.875rem', display: 'flex' }}>
                                                        Phí vận chuyển:
                                                        <Typography component="div" variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', marginLeft: 'auto' }}>
                                                            {shippingFee !== null ? shippingFee.toLocaleString('vi-VN') : "Đang tính toán"} VND
                                                        </Typography>
                                                    </Typography>
                                                </div>
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <Typography component="div" variant="body2" sx={{ fontSize: '0.875rem', display: 'flex' }}>
                                                        Tổng giá tiền đơn hàng:
                                                        <Typography component="div" variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', marginLeft: 'auto' }}>
                                                            {(total + (shippingFee !== null ? shippingFee : 0)).toLocaleString('vi-VN')} VND
                                                        </Typography>
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography component="div" variant="body2" sx={{ fontSize: '0.875rem', display: 'flex' }}>
                                                        Dự kiến ngày giao hàng:
                                                        <Typography component="div" variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', marginLeft: 'auto' }}>
                                                            {shippingDate !== null ? new Date(shippingDate).toLocaleDateString('en-GB') : "Đang tính toán"}
                                                        </Typography>
                                                    </Typography>
                                                </div>
                                            </div>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                            Thanh toán
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="paymentMethod"
                                                name="paymentMethod"
                                                value={paymentMethod}
                                                onChange={(event) => handleInputChange(event, 'paymentMethod')}
                                            >
                                                <FormControlLabel
                                                    value="VNPay"
                                                    control={<Radio />}
                                                    label={
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                                                                alt="VN Pay" style={{ width: 50, height: 50, marginRight: 8 }} />
                                                            <Typography variant="subtitle1">VN Pay</Typography>
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleCheckout}
                            style={{ marginTop: 16 }}
                        >
                            Tiến Hành Thanh Toán
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Paper style={{ padding: 16, textAlign: 'center', marginBottom: 16 }}>
                            <Typography variant="h6" gutterBottom>
                                Tổng cộng:
                            </Typography>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                style={{ color: '#ff5722' }}
                            >
                                {total.toLocaleString('vi-VN')} VND
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Checkout;
