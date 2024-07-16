import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import storeServices from 'services/storeServices';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid } from '@mui/material';
import Navbar from 'components/main/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Star, StarHalf, StarOutline } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import cartServices from 'services/cartServices';
import { addToCartAction } from 'contexts/redux/cart/actions';
import { toast } from 'react-toastify';

export default function ProductDetail() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');

    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [quantities, setQuantities] = useState(sessionStorage.getItem('cartQuantity'));

    useEffect(() => {
        let fetchData = async () => {
            let resOfBookDetails = await storeServices.getBookDetails(slug);
            setProduct(resOfBookDetails.data.data);

            let resOfRatings = await storeServices.getAllRatings(slug);
            setRatings(resOfRatings.data);
        };
        fetchData();
        if (sessionStorage.getItem('roles') && sessionStorage.getItem('roles').includes('CUSTOMER')) {
            let fetchCart = async () => {
                try {
                    let resOfCart = await cartServices.getAllCart(username);
                    setCart(resOfCart.data);
                } catch (error) {
                    setCart([]);
                }
            };
            fetchCart();
        } else {
            setCart([]);
        }
    }, [slug, quantities]);

    if (!product) return <div>Đang tải...</div>;

    const renderTypeOfBookItem = (item, bookItem, index) => {
        let format = '';
        if (bookItem.type === 'PAPER') {
            format += 'Bản cứng';
        } else if (bookItem.type === 'AUDIO') {
            format += 'Audio';
        } else if (bookItem.type === 'PDF') {
            format += 'PDF';
        }

        if (index < item.items.length - 1) {
            format += ', ';
        }

        return format;
    }

    const renderGenresOfBook = (arrayOfGenres, genre, index) => {
        let format = '';
        if (arrayOfGenres.length) {
            format += genre;
        }
        if (index < arrayOfGenres.length - 1) {
            format += ', ';
        }

        return format;
    }

    const renderDurationOfAudio = (duration) => {
        let format = '';
        let hours = 0;
        let minutes = 0;

        minutes = duration % 60;
        hours = (duration - minutes) / 60;
        if (hours > 0) {
            format += hours + ' giờ ' + minutes + ' phút';
        }

        if (0 <= hours < 1) {
            format += minutes + ' phút';
        }

        return format;
    }

    const handleAddToCart = async (product) => {
        if (sessionStorage.getItem('jwtToken')) {
            let isAlreadyInCart = cart.some(item => item.bookPackageId === product.id);

            if (isAlreadyInCart) {
                toast.error('Sản phẩm này đã có trong giỏ hàng');
            } else {
                let isPaper = product.items.find(item => item.type.includes('PAPER'));
                if (isPaper) {
                    setCart({ ...cart, product });
                    let bookPackageId = product.id;
                    let data = {
                        username: sessionStorage.getItem('username'),
                        bookPackageId: bookPackageId,
                        quantity: 1
                    }
                    dispatch(addToCartAction(data.username, data.quantity, data));
                    if (sessionStorage.getItem('roles').includes('CUSTOMER')) {
                        await cartServices.addToCart(data.username, data);
                    } else {
                        toast.error('Tài khoản của bạn không phải là tài khoản của khách hàng');
                    }
                    setQuantities(quantities + 1);
                    toast.success('Đã thêm thành công vào giỏ hàng');
                } else {
                    toast.error('Gói sách không có bản cứng');
                    toast.info('Mua Audio và PDF vui lòng sử dụng app trên điện thoại');
                }
            }
        } else {
            setLoading(true);
            toast.loading('Vui lòng đăng nhập để mua sản phẩm');
            setTimeout(() => {
                setLoading(false);
                toast.dismiss();
                navigate('/login');
            }, 2000);
        }
    };

    const calculateStarsRating = () => {
        if (!ratings || ratings.length === 0) {
            return 0;
        }
        const sum = ratings.reduce((acc, rating) => acc + rating.star, 0);
        const averageRating = sum / ratings.length;
        const roundedRating = Math.round(averageRating * 2) / 2;

        return roundedRating;
    }

    const renderStarRating = (rating, fontSize) => {
        let numOfStars = Math.floor(rating.star);
        let hasHalfStar = rating.star % 1 !== 0;
        let stars = [];
        for (let i = 0; i < numOfStars; i++) {
            stars.push(<Star fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
        }
        if (hasHalfStar) {
            stars.push(<StarHalf fontSize='small' key={numOfStars} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
            numOfStars++;
        }
        for (let i = numOfStars; i < 5; i++) {
            stars.push(<StarOutline fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
        }

        return stars;
    }

    const renderNoStarRating = (fontSize) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<StarOutline fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
        }

        return stars;
    }

    const formattedDate = (createdAt) => {
        let date = new Date(createdAt);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day} / ${month} / ${year}`;
    };

    return (
        <>
            <Navbar />
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                    sx={{
                        maxWidth: '100%',
                        height: '100%',
                        display: 'flex',
                        padding: '20px 0',
                        paddingBottom: '10px',
                        justifyContent: 'center',
                        backgroundColor: '#B17940',
                        color: '#FFF'
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            height: 270,
                            width: 180,
                            borderRadius: 5 + 'px'
                        }}
                        image={product.book.bookCoverImg}
                        title={product.book.title}
                    />
                    <CardContent
                        sx={{
                            padding: 'auto 0',
                            paddingLeft: 56 + 'px'
                        }}
                    >
                        <Typography variant="body1" component="div"
                            sx={{
                                backgroundColor: 'hsla(0,0%,100%,.3)',
                                borderRadius: 5 + 'px',
                                padding: '0 10px',
                                fontSize: 1 + 'rem',
                                width: 'fit-content',
                            }}
                        >
                            {product.items.map((bookItem, index) => renderTypeOfBookItem(product, bookItem, index))}
                        </Typography>
                        <Typography variant="h3" component="div"
                            sx={{
                                maxWidth: 500,
                                fontWeight: 600,
                                fontSize: 2 + 'rem',
                                paddingBottom: '.5rem',
                                lineHeight: 40 + 'px',
                                wordWrap: 'break-word'
                            }}
                        >
                            {product.book.title}
                        </Typography>
                        <Typography variant="h5" component="div"
                            sx={{
                                fontWeight: 500,
                                fontSize: 1.125 + 'rem',
                                fontFamily: 'Gilroy, sans-serif'
                            }}
                        >
                            <FontAwesomeIcon icon={faBars} style={{ fontSize: 18 + 'px' }} /> {' '}
                            {product.book.genres.map((genre, index) => renderGenresOfBook(product.book.genres, genre.name, index))}
                        </Typography>
                        <Typography variant="h5" component="div"
                            sx={{ marginBottom: 10 + 'px' }}
                        >
                            {
                                product.items.map((item, key) => item.type === 'AUDIO' && (
                                    <Typography key={key}>
                                        <FontAwesomeIcon icon={faClock} style={{ fontSize: 18 + 'px' }} />
                                        {' '}
                                        {renderDurationOfAudio(item.duration)}
                                    </Typography>
                                ))
                            }
                        </Typography>
                        <Typography variant="h5" component="div"
                            sx={{
                                fontSize: 1.5 + 'rem',
                                color: 'maroon'
                            }}
                        >
                            <FontAwesomeIcon icon={faMoneyBill1} />
                            {' '}
                            {product.price.toLocaleString('vi-VN')} VND
                        </Typography>
                        <CardActions sx={{ padding: '1px 0' }}>
                            <Button size="small"
                                sx={{
                                    color: "maroon",
                                    border: 2 + 'px solid maroon',
                                    borderRadius: 5 + 'px',
                                    fontSize: 1 + 'rem',
                                    '&:hover': {
                                        transition: .5 + 's',
                                        border: 2 + 'px solid white',
                                        backgroundColor: 'darkcyan',
                                        color: '#FFF'
                                    }
                                }}
                                onClick={() => handleAddToCart(product)}
                            >Thêm vào giỏ hàng</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardContent
                        sx={{
                            width: '70%',
                            margin: '0 auto'
                        }}
                    >
                        <Typography component="div"
                            sx={{
                                fontWeight: 700,
                                fontSize: 1.75 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                marginBottom: 10 + 'px'
                            }}
                        >Giới thiệu nội dung</Typography>
                        <Typography variant='body1' component="div"
                            sx={{
                                fontFamily: 'Gilroy,sans-serif',
                                fontSize: 1.4 + 'rem',
                                marginBottom: 20 + 'px'
                            }}
                        >{product.book.description}</Typography>
                        <Typography component="div"
                            sx={{
                                fontWeight: 700,
                                fontSize: 1.75 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                marginBottom: 10 + 'px'
                            }}
                        >Về tác giả</Typography>
                        <Typography component="div" sx={{
                            display: 'flex',
                            marginBottom: 20 + 'px'
                        }}>
                            <Avatar sx={{ marginRight: 10 + 'px' }} />
                            <Typography variant='h5'
                                sx={{
                                    fontFamily: 'Gilroy,sans-serif',
                                    fontSize: 1.4 + 'rem',
                                    fontWeight: 500,
                                    verticalAlign: 'middle'
                                }}
                            >{product.book.author}</Typography>
                        </Typography>
                        <Typography component="div"
                            sx={{
                                fontWeight: 700,
                                fontSize: 1.75 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                marginBottom: 10 + 'px'
                            }}
                        >Thông tin xuất bản</Typography>

                        <Grid>
                            <Typography component="div" sx={{ display: 'flex', marginBottom: 20 + 'px' }}>
                                <Typography component="div" sx={{
                                    fontWeigh: 500,
                                    fontSize: 1.4 + 'rem',
                                    fontFamily: 'Gilroy,sans-serif',
                                    color: '#6A7990',
                                    width: 20 + 'rem'
                                }}>Số quyết định xuất bản</Typography>
                                <Typography component="div"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 1.4 + 'rem',
                                        fontFamily: 'Gilroy,sans-serif',
                                    }}
                                >{product.book.publicationDecisionNumber}</Typography>
                            </Typography>
                            <Typography component="div" sx={{ display: 'flex', marginBottom: 20 + 'px' }}>
                                <Typography sx={{
                                    fontWeigh: 500,
                                    fontSize: 1.4 + 'rem',
                                    fontFamily: 'Gilroy,sans-serif',
                                    color: '#6A7990',
                                    width: 20 + 'rem'
                                }}>Số xác nhận đăng ký xuất bản</Typography>
                                <Typography component="div"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 1.4 + 'rem',
                                        fontFamily: 'Gilroy,sans-serif',
                                    }}
                                >{product.book.publicationRegistConfirmNum}</Typography>
                            </Typography>
                            <Typography component="div" sx={{ display: 'flex', marginBottom: 20 + 'px' }}>
                                <Typography component="div" sx={{
                                    fontWeigh: 500,
                                    fontSize: 1.4 + 'rem',
                                    fontFamily: 'Gilroy,sans-serif',
                                    color: '#6A7990',
                                    width: 20 + 'rem'
                                }}>Số ISBN</Typography>
                                <Typography component="div"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 1.4 + 'rem',
                                        fontFamily: 'Gilroy,sans-serif',
                                    }}
                                >{product.book.ISBN}</Typography>
                            </Typography>
                            <Typography component="div" sx={{ display: 'flex', marginBottom: 20 + 'px' }}>
                                <Typography component="div" sx={{
                                    fontWeigh: 500,
                                    fontSize: 1.4 + 'rem',
                                    fontFamily: 'Gilroy,sans-serif',
                                    color: '#6A7990',
                                    width: 20 + 'rem'
                                }}>Nộp lưu chiểu</Typography>
                                <Typography component="div"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 1.4 + 'rem',
                                        fontFamily: 'Gilroy,sans-serif',
                                        width: 500
                                    }}
                                >{product.book.depositCopy}</Typography>
                            </Typography>
                            <Typography component="div" sx={{ display: 'flex', marginBottom: 20 + 'px' }}>
                                <Typography component="div" sx={{
                                    fontWeigh: 500,
                                    fontSize: 1.4 + 'rem',
                                    fontFamily: 'Gilroy,sans-serif',
                                    color: '#6A7990',
                                    width: 20 + 'rem'
                                }}>Công ty phát hành</Typography>
                                <Typography component="div"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 1.4 + 'rem',
                                        fontFamily: 'Gilroy,sans-serif',
                                    }}
                                >{product.book.publisher.name}</Typography>
                            </Typography>
                        </Grid>

                        <Typography component="div"
                            sx={{
                                fontWeight: 700,
                                fontSize: 1.75 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                marginBottom: 10 + 'px'
                            }}
                        >Đánh giá & nhận xét</Typography>
                        <Typography component="div">
                            <Typography component="div" sx={{ display: 'flex' }}>
                                {ratings.map((index) => (
                                    <Typography key={index} component="div"
                                        sx={{
                                            marginRight: 20 + 'px',
                                            fontSize: 3.5 + 'rem',
                                            lineHeight: 64 + 'px',
                                            fontFamily: 'Gilroy, sans-serif',
                                            fontWeight: 700,
                                            color: 'rgb(255, 187, 82)'
                                        }}
                                    >
                                        {calculateStarsRating()}
                                    </Typography>
                                ))}
                                <Typography component="div">
                                    <Typography component="div"
                                        sx={{
                                            color: 'rgb(106, 121, 144)',
                                            fontFamily: 'Gilroy,sans-serif',
                                            fontWeight: 700,
                                            fontSize: 1.125 + 'rem',
                                            lineHeight: 24 + 'px',
                                            paddingTop: 7 + 'px'
                                        }}
                                    >
                                        Đánh giá chung ({ratings.length} <FontAwesomeIcon icon={faComment} />)
                                    </Typography>
                                    <Typography component="div">
                                        {
                                            ratings && ratings.length > 0 ?
                                                ratings.map((rating) => renderStarRating(rating, 24))
                                                :
                                                renderNoStarRating(24)
                                        }
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component="div">
                                {
                                    ratings.map((rating, key) => (
                                        <Typography component="div" key={key}>
                                            <Divider component="div" sx={{ my: 2 }} />
                                            <Typography component="div">
                                                <Typography component="div"
                                                    sx={{
                                                        color: 'rgb(106, 121, 144)',
                                                        fontFamily: 'Gilroy, sans-serif',
                                                        fontSize: 1.125 + 'rem',
                                                        lineHeight: 24 + 'px',
                                                        fontWeight: 500,
                                                        marginBottom: 10 + 'px'
                                                    }}
                                                >
                                                    Đánh giá
                                                    <Typography component="div" sx={{
                                                        display: 'inline-block',
                                                        marginLeft: 30 + 'px'
                                                    }}>
                                                        {
                                                            ratings && ratings.length > 0 ?
                                                                ratings.map((rating) => renderStarRating(rating, 20))
                                                                :
                                                                renderNoStarRating(20)
                                                        }
                                                    </Typography>
                                                </Typography>
                                                <Typography component="div">
                                                    <Typography component="div"
                                                        sx={{
                                                            color: 'rgb(26, 49, 84)',
                                                            fontFamily: 'Gilroy, sans-serif',
                                                            fontSize: 1.125 + 'rem',
                                                            lineHeight: 24 + 'px',
                                                            fontWeight: 500,
                                                            marginBottom: 10 + 'px'
                                                        }}
                                                    >{rating.comment}</Typography>
                                                </Typography>
                                                <Typography component="div"
                                                    sx={{
                                                        color: 'rgb(106, 121, 144)',
                                                        fontFamily: 'Gilroy, sans-serif',
                                                        fontSize: 1.125 + 'rem',
                                                        lineHeight: 24 + 'px',
                                                        fontWeight: 500,
                                                        marginBottom: 10 + 'px'
                                                    }}
                                                >
                                                    {rating.customer.fullname} - {formattedDate(rating.createdAt)}
                                                </Typography>
                                            </Typography>
                                        </Typography>
                                    ))
                                }
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}
