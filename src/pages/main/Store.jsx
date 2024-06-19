import Navbar from "components/main/Navbar";
import Footer from "components/main/Footer";
import Filter from "components/shop/Filter";
import Product from "components/shop/Product";

const Store = () => {
    return (
        <>
            <Navbar />
            Welcome to shop page
            <Filter />
            <Product />
            <Footer />
        </>
    );
}

export default Store;