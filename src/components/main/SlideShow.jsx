import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CardMedia, Slide } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Slideshow = () => {
    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Slide 1',
            description: 'Description of slide 1.',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Slide 2',
            description: 'Description of slide 2.',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Slide 3',
            description: 'Description of slide 3.',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1501789055141-e427f92fb1c2?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Slide 4',
            description: 'Description of slide 4.',
        },
    ];

    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState('left'); // For Slide animation direction

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('left');
            setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [slides.length]);

    const handleNextSlide = () => {
        setDirection('left');
        setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setDirection('right');
        setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    return (
        <Box sx={{ position: 'relative', height: 600, overflow: 'hidden' }}>
            {slides.map((slide, index) => (
                <Slide
                    key={slide.id}
                    direction={index === activeSlide ? direction : 'right'}
                    in={index === activeSlide}
                    mountOnEnter
                    unmountOnExit
                >
                    <CardMedia
                        component="img"
                        height="600"
                        image={slide.image}
                        alt={slide.title}
                        sx={{ objectFit: 'cover', width: '100%', opacity: '80%' }}
                    />
                </Slide>
            ))}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingX: 2,
                    zIndex: 1,
                }}
            >
                <Button onClick={handlePrevSlide} sx={{
                    color: 'rgb(220, 120, 0)',
                    '&:hover': {
                        backgroundColor: 'unset'
                    }
                }}>
                    <ArrowBackIos />
                </Button>
                <Container maxWidth="md" sx={{ color: '#2E4362', textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {slides[activeSlide].title}
                    </Typography>
                    <Typography variant="subtitle1">
                        {slides[activeSlide].description}
                    </Typography>
                </Container>
                <Button onClick={handleNextSlide} sx={{
                    color: 'rgb(220, 120, 0)',
                    '&:hover': {
                        backgroundColor: 'unset'
                    }
                }}>
                    <ArrowForwardIos />
                </Button>
            </Box>
        </Box>
    );
};

export default Slideshow;