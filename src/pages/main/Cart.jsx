import React, { useState } from "react";
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
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Add, Remove, Close, ArrowBack } from "@mui/icons-material";
import Footer from "components/main/Footer";
import Navbar from "components/main/Navbar";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Cotton T-shirt",
            category: "Shirt",
            price: 44.0,
            quantity: 1,
            image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
        },
        {
            id: 2,
            name: "Cotton T-shirt",
            category: "Shirt",
            price: 44.0,
            quantity: 1,
            image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp",
        },
        {
            id: 3,
            name: "Cotton T-shirt",
            category: "Shirt",
            price: 44.0,
            quantity: 1,
            image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp",
        },
    ]);

    const [shipping, setShipping] = useState(5.0);
    const [code, setCode] = useState("");

    const handleQuantityChange = (id, delta) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + delta } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleShippingChange = (event) => {
        const selectedShipping = event.target.value;
        const shippingCost = selectedShipping === "1" ? 5.0 : 10.0; // example logic for shipping cost
        setShipping(shippingCost);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) + shipping;

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
                                                        Shopping Cart
                                                    </Typography>
                                                    <Typography color="textSecondary">{totalItems} items</Typography>
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {cartItems.map((item) => (
                                                    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }} key={item.id}>
                                                        <Grid item md={2}>
                                                            <CardMedia
                                                                component="img"
                                                                image={item.image}
                                                                alt={item.name}
                                                                sx={{ borderRadius: 1 }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography color="textSecondary">{item.category}</Typography>
                                                            <Typography>{item.name}</Typography>
                                                        </Grid>
                                                        <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                                                            <IconButton
                                                                onClick={() => handleQuantityChange(item.id, -1)}
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
                                                            <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                                                <Add />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item md={3} sx={{ textAlign: "right" }}>
                                                            <Typography>€ {item.price.toFixed(2)}</Typography>
                                                        </Grid>
                                                        <Grid item md={1} sx={{ textAlign: "right" }}>
                                                            <IconButton onClick={() => handleRemoveItem(item.id)}>
                                                                <Close />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                ))}

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {/* Back to shop link */}
                                                <Box sx={{ pt: 5 }}>
                                                    <Typography variant="body1" component="a" href="#!" color="textPrimary" sx={{ display: "flex", alignItems: "center" }}>
                                                        <ArrowBack sx={{ mr: 1 }} /> Back to shop
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        {/* Right column: Summary */}
                                        <Grid item lg={4} sx={{ backgroundColor: "#f5f5f5" }}>
                                            <Box sx={{ p: 5 }}>
                                                <Typography variant="h4" fontWeight="bold" mb={5}>
                                                    Summary
                                                </Typography>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                                                    <Typography variant="h6">Items {totalItems}</Typography>
                                                    <Typography variant="h6">€ {totalPrice.toFixed(2)}</Typography>
                                                </Box>

                                                <Typography variant="h6" mb={3}>
                                                    Shipping
                                                </Typography>

                                                <Box sx={{ mb: 4, pb: 2 }}>
                                                    <Select fullWidth defaultValue="1" onChange={handleShippingChange}>
                                                        <MenuItem value="1">Standard-Delivery- €5.00</MenuItem>
                                                        <MenuItem value="2">Express-Delivery- €10.00</MenuItem>
                                                    </Select>
                                                </Box>

                                                <Typography variant="h6" mb={3}>
                                                    Give code
                                                </Typography>

                                                <Box sx={{ mb: 5 }}>
                                                    <TextField fullWidth label="Enter your code" variant="outlined" value={code} onChange={handleCodeChange} />
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                                                    <Typography variant="h6">Total price</Typography>
                                                    <Typography variant="h6">€ {totalPrice.toFixed(2)}</Typography>
                                                </Box>

                                                <Button variant="contained" color="primary" fullWidth>
                                                    Register
                                                </Button>
                                                <Button variant="contained" color="secondary" fullWidth onClick={handleClearCart} sx={{ mt: 2 }}>
                                                    Clear All
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Cart;
