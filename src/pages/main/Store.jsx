import Navbar from "components/main/Navbar";
import Footer from "components/main/Footer";
import Filter from "components/store/Filter";
import Product from "components/store/Product";

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