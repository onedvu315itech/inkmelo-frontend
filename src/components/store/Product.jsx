import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation
import cartServices from 'services/cartServices';


export default function Product() {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState({});
    const navigate = useNavigate(); // for navigation

    useEffect(() => {
        const callProduct = async () => {
            const res = await axios.get('https://inkmelo-springboot-be-s2etd44lba-as.a.run.app/store/api/v1/book-packages');
            console.log(res.data);
            setProduct(res.data);
        };
        callProduct();
    }, []);

    const handleAddToCart = async (item) => {
        setCart({ ...cart, item });
        let bookPackageId = cart.item.id
        let data = {
            bookPackageId: bookPackageId,
            quantity: 1
        }
        await cartServices.addToCart(data)
        alert('Đã thêm thành công vào giỏ hàng')
    };

    const handleViewDetails = (slug) => {
        navigate(`/store/product/${slug}`);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                {product && product.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 400, width: '100%' }}
                                image={item.book.bookCoverImg}
                                title={item.book.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.price} VNĐ
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleAddToCart(item)}>Thêm vào giỏ hàng</Button>
                                <Button size="small" onClick={() => handleViewDetails(item.id)}>Xem chi tiết</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
