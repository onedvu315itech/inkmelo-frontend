import Navbar from "components/main/Navbar";
import Footer from "components/main/Footer";
import Filter from "components/store/Filter";
import Product from "components/store/Product";
import { useState } from "react";

const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState('2');

    const handleFilterChange = (category) => {
        setSelectedCategory(category);
    };
    return (
        <>
            <Navbar />
            <div className="container pt-5 "
                style={{
                    width: 80 + '%'
                }}
            >
                <div className="row"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginRight: 12 + 'px',
                        marginLeft: 12 + 'px'
                    }}
                >
                    <div className="col-12 col-md-6 mb-3">
                        <h1
                            style={{
                                fontSize: 2 + 'rem'
                            }}
                        >Sách</h1>
                        <h2
                            style={{
                                fontSize: 1.125 + 'rem'
                            }}
                        >Sách bản quyền bán chạy từ tác giả Việt Nam và quốc tế. Ứng
                            dụng sách bản cứng, sách nói, sách bản mềm pdf #1 Việt Nam
                        </h2>
                    </div>
                    <div className="col-12 offset-md-3 col-md-3 align-items-center"
                        style={{ display: "flex" }}
                    >
                        <Filter handleFilterChange={handleFilterChange} selectedCategory={selectedCategory} />
                    </div>
                </div>
                <Product categoryId={selectedCategory === 'all' ? null : selectedCategory} />
            </div>
            <Footer />
        </>
    );
}

export default Store;