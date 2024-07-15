import Navbar from "components/main/Navbar";
import Footer from "components/main/Footer";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import bookLibrary from "assets/images/web/book-library-cover.jpg"
import Slideshow from "components/main/SlideShow";

const Home = () => {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    backgroundImage: `url(${bookLibrary})`,
                    height: 700,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2E4362',
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h1" component="h1" gutterBottom>
                        Chào mừng đến với Thư viện Sách của chúng tôi
                    </Typography>
                    <Typography variant="h4">
                        Khám phá một loạt sách phong phú dành cho mọi độc giả.
                    </Typography>
                    <Button size="large" sx={{
                        mt: 2,
                        color: '#2E4362',
                        border: 1.5 + 'px solid #2E4362'
                    }} href="/store">
                        Khám phá Sách
                    </Button>
                </Container>
            </Box>
            <div id="unique-content">
                <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h2" gutterBottom sx={{ fontSize: 3.5 + 'rem', color: '#2E4362' }}>Thư viện với hơn 13.000+ đầu sách</Typography>
                    </Box>
                </Grid>
                <Slideshow />
            </div>
            <div id="mobile-app-intro">
                <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h2" gutterBottom sx={{ fontSize: 3.5 + 'rem', color: '#2E4362' }}>Ứng dụng Di động</Typography>
                    </Box>
                </Grid>
                <Grid container spacing={3} sx={{ backgroundColor: 'whitesmoke' }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            padding: 3,
                        }}>
                            <Typography variant="h3" gutterBottom sx={{
                                fontSize: 3.5 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                color: '#2E4362',
                                fontWeight: 700,

                            }}>
                                Thư viện điện tử
                            </Typography>
                            <Typography variant="h5" paragraph sx={{
                                fontSize: 1.5 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                fontWeight: 500
                            }}>
                                #1 Ứng dụng sách tại Việt Nam trên Kho ứng dụng Apple & Google store.
                            </Typography>
                            <Typography variant="h5" paragraph sx={{
                                fontSize: 1.5 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                fontWeight: 500,
                                color: '#6B80A0'
                            }}>
                                Với 13.000+ nội dung Sách nói có bản quyền, Podcourse, Ebook, Podcast cùng nhiều nội dung phong phú khác.
                            </Typography>
                            <Typography variant="h5" paragraph sx={{
                                fontSize: 1.5 + 'rem',
                                fontFamily: 'Gilroy,sans-serif',
                                fontWeight: 500,
                                color: '#6B80A0'
                            }}>
                                Tải xuống ứng dụng của chúng tôi và truy cập vào những cuốn sách yêu thích của bạn mọi lúc mọi nơi!
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 600,
                                overflow: 'hidden',
                            }}
                        >
                            <img src="https://fonos.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_headline.84e71251.webp&w=3840&q=75"
                                alt="Mobile App Preview" style={{ maxWidth: '100%' }} />
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    );
}

export default Home;