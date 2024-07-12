import React, { Component } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper
} from '@mui/material';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [
                { title: 'Book Title 1', price: 20, quantity: 1 },
                { title: 'Book Title 2', price: 25, quantity: 2 }
            ],
            total: 70, // Calculate total dynamically in a real app
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

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleQuantityChange(index, quantity) {
        const newCartItems = [...this.state.cartItems];
        newCartItems[index].quantity = quantity;
        this.setState({ cartItems: newCartItems }, () => {
            this.calculateTotal(newCartItems);
        });
    }

    calculateTotal(items) {
        const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
        alert('Checkout process initiated.');
        // Implement actual checkout process here
    }

    render() {
        const { cartItems, total, userDetails, paymentDetails } = this.state;

        return (
            <>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Checkout
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Cart Items
                                </Typography>
                                {cartItems.map((item, index) => (
                                    <Grid container spacing={2} key={index} style={{ marginBottom: 16 }}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography>Price: ${item.price}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => this.handleQuantityChange(index, parseInt(e.target.value))}
                                                inputProps={{ min: 1 }}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Paper>
                            <Paper style={{ padding: 16, marginBottom: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    User Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Name"
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
                                            label="Address"
                                            name="address"
                                            value={userDetails.address}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="City"
                                            name="city"
                                            value={userDetails.city}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={userDetails.state}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Zip"
                                            name="zip"
                                            value={userDetails.zip}
                                            onChange={(e) => this.handleInputChange(e, 'userDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ padding: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Payment Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            label="Card Number"
                                            name="cardNumber"
                                            value={paymentDetails.cardNumber}
                                            onChange={(e) => this.handleInputChange(e, 'paymentDetails')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Expiry Date"
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
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper style={{ padding: 16 }}>
                                <Typography variant="h6" gutterBottom>
                                    Total: ${total}
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth onClick={this.handleCheckout}>
                                    Proceed to Payment
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}

export default Checkout;
