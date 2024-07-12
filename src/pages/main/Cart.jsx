import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Input,
    Typography,
    TextField,
} from "@mui/material";
import { Add, Remove, Close, ArrowBack } from "@mui/icons-material";
import Footer from "components/main/Footer";
import Navbar from "components/main/Navbar";
import cartServices from "services/cartServices";
import { useNavigate } from "react-router";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [code, setCode] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        getAllCart();
    }, []);

    const getAllCart = async () => {
        let res = await cartServices.getAllCart();
        if (res) {
            setCart(res.data);
        }
    };

    const handleQuantityChange = (id, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookTitle === id ? { ...item, quantity: item.quantity + delta } : item
            )
        );
    };

    const handleRemoveItem = async (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.bookPackageId !== id));
        let bookPackageId = id
        let data = {
            bookPackageId: bookPackageId,
            quantity: 0
        }
        await cartServices.addToCart(data);

    };

    const handleCheckOut = () => {
        navigate('/cart/checkout');
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.bookPackagePrice, 0);

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: "#eee", minHeight: "100vh" }}>
                <Container sx={{ py: 5 }}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent sx={{ p: 0 }}>
                                    <Grid container spacing={0}>
                                        {/* Left column: Shopping Cart Items */}
                                        <Grid item lg={8}>
                                            <Box sx={{ p: 5 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
                                                    <Typography variant="h4" fontWeight="bold">
                                                        Giỏ hàng
                                                    </Typography>
                                                    <Typography color="textSecondary">{totalItems} Sản phẩm</Typography>
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {cart.map((item, key) => (
                                                    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }} key={key}>
                                                        <Grid item md={2}>
                                                            <CardMedia
                                                                component="img"
                                                                image={item.bookCoverImg}
                                                                alt={item.bookTitle}
                                                                sx={{ borderRadius: 1 }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography>{item.bookTitle}</Typography>
                                                            <Typography color="textSecondary">{item.bookAuthor}</Typography>
                                                        </Grid>
                                                        <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                                                            <IconButton
                                                                onClick={() => handleQuantityChange(item.bookTitle, -1)}
                                                                disabled={item.quantity === 1}
                                                            >
                                                                <Remove />
                                                            </IconButton>
                                                            <Input
                                                                type="number"
                                                                value={item.quantity}
                                                                inputProps={{ min: 1 }}
                                                                sx={{ width: 50, mx: 1 }}
                                                                readOnly
                                                            />
                                                            <IconButton onClick={() => handleQuantityChange(item.bookTitle, 1)}>
                                                                <Add />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item md={3} sx={{ textAlign: "right" }}>
                                                            <Typography>{item.bookPackagePrice} VND</Typography>
                                                        </Grid>
                                                        <Grid item md={1} sx={{ textAlign: "right" }}>
                                                            <IconButton onClick={() => handleRemoveItem(item.bookPackageId)}>
                                                                <Close />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                ))}

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {/* Back to shop link */}
                                                <Box sx={{ pt: 5 }}>
                                                    <Typography variant="body1" component="a" href="/store" color="textPrimary" sx={{ display: "flex", alignItems: "center", marginRight: "590px" }}>
                                                        <ArrowBack sx={{ mr: 1 }} /> Trở lại cửa hàng
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        {/* Right column: Summary */}
                                        <Grid item lg={4} sx={{ backgroundColor: "#f5f5f5" }}>
                                            <Box sx={{ p: 5 }}>
                                                <Typography variant="h4" fontWeight="bold" mb={5}>
                                                    Tổng kết
                                                </Typography>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                                                    <Typography variant="h6">Số sản phẩm {totalItems}</Typography>
                                                    <Typography variant="h6">{totalPrice} VND</Typography>
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                                                    <Typography variant="h6">Tổng giá tiền</Typography>
                                                    <Typography variant="h6">{totalPrice} VND</Typography>
                                                </Box>

                                                <Button variant="contained" color="primary" fullWidth
                                                    onClick={handleCheckOut}>
                                                    Mua hàng
                                                </Button>

                                            </Box>/
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
            <Footer />
        </>
    );
};

export default Cart;
