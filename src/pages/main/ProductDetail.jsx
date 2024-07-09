import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`https://inkmelo-springboot-be-s2etd44lba-as.a.run.app/store/api/v1/book-packages/slug/${slug}`);
            setProduct(res.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" component="div">
                {product.book.title}
            </Typography>
            <img src={product.book.bookCoverImg} alt={product.book.title} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h5" component="div">
                {product.price} VNĐ
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {product.book.description}
            </Typography>
        </Container>
    );
}