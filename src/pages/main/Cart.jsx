import React from "react";
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
                                                    <Typography color="textSecondary">3 items</Typography>
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {/* Item 1 */}
                                                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                                    <Grid item md={2}>
                                                        <CardMedia
                                                            component="img"
                                                            image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                                            alt="Cotton T-shirt"
                                                            sx={{ borderRadius: 1 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography color="textSecondary">Shirt</Typography>
                                                        <Typography>Cotton T-shirt</Typography>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                                                        <IconButton>
                                                            <Remove />
                                                        </IconButton>
                                                        <Input
                                                            type="number"
                                                            defaultValue={1}
                                                            inputProps={{ min: 0 }}
                                                            sx={{ width: 50, mx: 1 }}
                                                        />
                                                        <IconButton>
                                                            <Add />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ textAlign: "right" }}>
                                                        <Typography>€ 44.00</Typography>
                                                    </Grid>
                                                    <Grid item md={1} sx={{ textAlign: "right" }}>
                                                        <IconButton>
                                                            <Close />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {/* Item 2 */}
                                                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                                    <Grid item md={2}>
                                                        <CardMedia
                                                            component="img"
                                                            image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp"
                                                            alt="Cotton T-shirt"
                                                            sx={{ borderRadius: 1 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography color="textSecondary">Shirt</Typography>
                                                        <Typography>Cotton T-shirt</Typography>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                                                        <IconButton>
                                                            <Remove />
                                                        </IconButton>
                                                        <Input
                                                            type="number"
                                                            defaultValue={1}
                                                            inputProps={{ min: 0 }}
                                                            sx={{ width: 50, mx: 1 }}
                                                        />
                                                        <IconButton>
                                                            <Add />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ textAlign: "right" }}>
                                                        <Typography>€ 44.00</Typography>
                                                    </Grid>
                                                    <Grid item md={1} sx={{ textAlign: "right" }}>
                                                        <IconButton>
                                                            <Close />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                {/* Item 3 */}
                                                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                                    <Grid item md={2}>
                                                        <CardMedia
                                                            component="img"
                                                            image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp"
                                                            alt="Cotton T-shirt"
                                                            sx={{ borderRadius: 1 }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography color="textSecondary">Shirt</Typography>
                                                        <Typography>Cotton T-shirt</Typography>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                                                        <IconButton>
                                                            <Remove />
                                                        </IconButton>
                                                        <Input
                                                            type="number"
                                                            defaultValue={1}
                                                            inputProps={{ min: 0 }}
                                                            sx={{ width: 50, mx: 1 }}
                                                        />
                                                        <IconButton>
                                                            <Add />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item md={3} sx={{ textAlign: "right" }}>
                                                        <Typography>€ 44.00</Typography>
                                                    </Grid>
                                                    <Grid item md={1} sx={{ textAlign: "right" }}>
                                                        <IconButton>
                                                            <Close />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>

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
                                                    <Typography variant="h6">Items 3</Typography>
                                                    <Typography variant="h6">€ 132.00</Typography>
                                                </Box>

                                                <Typography variant="h6" mb={3}>
                                                    Shipping
                                                </Typography>

                                                <Box sx={{ mb: 4, pb: 2 }}>
                                                    <Select fullWidth defaultValue="1">
                                                        <MenuItem value="1">Standard-Delivery- €5.00</MenuItem>
                                                        <MenuItem value="2">Two</MenuItem>
                                                        <MenuItem value="3">Three</MenuItem>
                                                        <MenuItem value="4">Four</MenuItem>
                                                    </Select>
                                                </Box>

                                                <Typography variant="h6" mb={3}>
                                                    Give code
                                                </Typography>

                                                <Box sx={{ mb: 5 }}>
                                                    <TextField fullWidth label="Enter your code" variant="outlined" />
                                                </Box>

                                                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                                                    <Typography variant="h6">Total price</Typography>
                                                    <Typography variant="h6">€ 137.00</Typography>
                                                </Box>

                                                <Button variant="contained" color="primary" fullWidth>
                                                    Register
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
}

export default Cart