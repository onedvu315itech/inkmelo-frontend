import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storeServices from 'services/storeServices';
import { Star, StarOutline } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export default function Product({ categoryId }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const callProduct = async () => {
            let resOfBookPackageFilter = (await storeServices.getAllBookPackageWithFilter(currentPage, 8, categoryId));
            let { items, totalPages } = resOfBookPackageFilter.data;
            setProduct(items);
            setTotalPages(totalPages);
        };
        callProduct();
    }, [currentPage, categoryId]);

    const renderStarRating = (rating) => {
        let numOfStars = Math.floor(rating.star);
        let hasHalfStar = rating.star % 1 !== 0;
        let stars = [];
        for (let i = 0; i < numOfStars; i++) {
            stars.push(<Star fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)' }} />);
        }
        if (hasHalfStar) {
            stars.push(<StarHalf fontSize='small' key={numOfStars} sx={{ color: 'rgb(255, 187, 82)' }} />);
            numOfStars++;
        }
        for (let i = numOfStars; i < 5; i++) {
            stars.push(<StarOutline fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)' }} />);
        }

        return stars;
    }

    const renderNoStarRating = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<StarOutline fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)' }} />);
        }

        return stars;
    }

    const renderTypeOfBookItem = (item, bookItem, index) => {
        let format = '';
        if (bookItem.type === 'PAPER') {
            format += 'bản cứng';
        } else if (bookItem.type === 'AUDIO') {
            format += 'audio';
        } else if (bookItem.type === 'PDF') {
            format += 'pdf';
        }

        if (index < item.items.length - 1) {
            format += ', ';
        }

        return format;
    }

    const handleViewDetails = (slug) => {
        navigate(`/store/product/${slug}`);
    };

    return (
        <Container>
            <Grid container spacing={1}>
                {product && product.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ cursor: "pointer" }}
                        onClick={() => handleViewDetails(item.id)}
                    >
                        <Card sx={{
                            maxWidth: 270,
                            height: '100%',
                            transition: 'background-color .5s ease-out',
                            '&:hover': {
                                transition: 1 + 's',
                                backgroundColor: '#f0f0f0',
                                boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
                                transform: 'scaleX(95%)' + 'scaleY(95%)'
                            }
                        }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 250 }}
                                image={item.book.bookCoverImg}
                                title={item.book.title}
                            />
                            <CardContent sx={{
                                padding: 16 + 'px',
                                paddingBottom: 1
                            }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{
                                    textOverflow: "ellipsis",
                                    width: 100 + '%',
                                    whiteSpace: "normal",
                                    height: 50,
                                    overflow: "hidden",
                                    display: "-webkit-flex",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    marginBottom: 0,
                                    fontWeight: 800
                                }}>
                                    {item.book.title}
                                </Typography>
                                <Typography variant="h6" gutterBottom
                                    sx={{
                                        height: 48,
                                        fontSize: 1 + 'rem',
                                        marginBottom: 0
                                    }}
                                >
                                    {item.book.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Bao gồm: {item.items.map((bookItem, index) => renderTypeOfBookItem(item, bookItem, index))}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {
                                        item.book.ratings && item.book.ratings.length > 0 ?
                                            item.book.ratings.map((rating) => renderStarRating(rating)) :
                                            renderNoStarRating()
                                    }
                                    {' '}
                                    ( {item.book.ratings.length} Nhận xét )
                                </Typography>
                                <Typography variant="body1" color="rgb(220, 120, 0)" sx={{
                                    marginBottom: 0
                                }}>
                                    {item.price.toLocaleString('vi-VN')} VND
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant={currentPage === index ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => setCurrentPage(index)}
                            sx={{ marginX: 1 }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>
            )}
        </Container>
    );
}
