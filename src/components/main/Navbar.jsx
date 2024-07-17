import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/icons/logo.png';
import logoNotext from '../../assets/images/icons/logo-notext.png';
import '../../style/css/Navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faFileInvoice, faHeart, faMagnifyingGlass, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import storeServices from 'services/storeServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutAction } from 'contexts/redux/auth/actions';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = sessionStorage.getItem('roles');
    const username = sessionStorage.getItem('username');

    let style = {
        color: '#000000',
        backgroundColor: '#F5F5F5',
        border: 1 + 'px solid rgb(220, 120, 0)'
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            let context = this;
            let args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResults.length > 0) {
                let dropdown = document.getElementById('search-dropdown');
                if (dropdown && !dropdown.contains(event.target)) {
                    setSearchResults([]);
                    setShowDropdown(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchResults]);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/login');
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            let res = await storeServices.getAllBookPackageWithFilter(null, null, null, query);
            if (query.trim() !== '') {
                setSearchResults(res.data);
                setShowDropdown(true);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        let inputValue = event.target.value;
        setQuery(inputValue);
        if (inputValue.trim() !== '') {
            setLoading(true);
            setSearchResults([]);
            setShowDropdown(true);
        } else {
            setLoading(false);
            setSearchResults([]);
            setShowDropdown(false);
        }

        debounce(async () => {
            try {
                if (inputValue.trim() !== '') {
                    let res = await storeServices.getAllBookPackageWithFilter(null, null, null, inputValue);
                    setSearchResults(res.data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }, 3000)();
    }

    const handleResultClick = (productId) => {
        setIsNavigating(true);
        toast.loading('Đang chuyển hướng đến sản phẩm được chọn');
        setTimeout(() => {
            setIsNavigating(false);
            toast.dismiss();
            navigate(`/store/product/${productId}`);
        }, 1000);
        setSearchResults([]);
        setQuery('');
    };

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

    return (
        <div className="main-navbar shadow-sm sticky-top">
            <div className="top-navbar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block navbar-start">
                            <a href="/"><img src={logo} alt="inkmelo-logo" /></a>
                        </div>
                        <div className="form-inline col-md-2 my-auto navbar-middle">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <a className="col-md-2 navbar-brand d-block d-sm-block d-md-none d-lg-none" href="/">
                                        <img src={logoNotext} alt="inkmelo-logo" height={50} />
                                    </a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Khám phá
                                        </a>
                                        <div id="explore-container" className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <div className="explore-navbar">
                                                <div className="explore-home">
                                                    <a className="dropdown-item explore-home-title" href="/">Trang chủ</a>
                                                    <ul>
                                                        <li><a className="dropdown-item explore-home-item" href="/#unique-content">Nội dung độc
                                                            quyền</a></li>
                                                        <li><a className="dropdown-item explore-home-item" href="/#mobile-app-intro">Ứng dụng
                                                            điện thoại</a></li>
                                                    </ul>
                                                </div>
                                                <div className="explore-shop">
                                                    <a className="dropdown-item explore-shop-title" href="/store">Cửa hàng</a>
                                                    <ul>
                                                        <li><a className="dropdown-item explore-shop-item" href="/store">Sách trong
                                                            nước</a></li>
                                                        <li><a className="dropdown-item explore-shop-item" href="/store">Sách nước
                                                            ngoài</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <hr className="dropdown-divider" />
                                            <div className="explore-about-us">
                                                <a className="dropdown-item explore-about-us-title" href="/about-us">Về chúng tôi</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-8 my-auto navbar-end">
                            <ul className="nav justify-content-end">
                                <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                                    <input className="form-control" type="search"
                                        placeholder="Tìm kiếm sản phẩm" aria-label="Search"
                                        value={query} onChange={(event) => handleInputChange(event)} />
                                    <button id="icon-search" className="btn bg-unset" type="submit">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button>
                                </form>
                                {loading && (
                                    <div className="position-absolute" id='search-dropdown'
                                        style={{
                                            width: 'calc(32% - 2px)',
                                            backgroundColor: '#FFF',
                                            border: '1px solid #CCC',
                                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                            maxHeight: 300,
                                            overflowY: 'auto',
                                            left: 'calc(32.3rem - 2px)',
                                            top: 4 + 'rem',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        <div
                                            className="dropdown-item"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                borderBottom: '1px solid #e0e0e0',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div>
                                                <p>Đang tìm...</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {query && searchResults.length > 0 && showDropdown && (
                                    <div className="position-absolute" id='search-dropdown'
                                        style={{
                                            width: 'calc(32% - 2px)',
                                            backgroundColor: '#FFF',
                                            border: '1px solid #CCC',
                                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                            maxHeight: 300,
                                            overflowY: 'auto',
                                            left: 'calc(32.3rem - 2px)',
                                            top: 4 + 'rem',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {searchResults.map((product) => (
                                            <div
                                                key={product.id}
                                                className="dropdown-item"
                                                onClick={() => handleResultClick(product.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div style={{ marginRight: '10px' }}>
                                                    <img src={product.book.bookCoverImg} alt={product.book.title} style={{ width: '50px', height: '70px', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h5 style={{
                                                        fontSize: '1rem',
                                                        marginBottom: '5px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'normal',
                                                        display: '-webkit-flex',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        lineHeight: '1.2em',
                                                        maxHeight: '2.4em'
                                                    }}>{product.book.title}</h5>
                                                    <p style={{ fontSize: '0.875rem', color: '#555' }}>Bao gồm {product.items.map((bookItem, index) => renderTypeOfBookItem(product, bookItem, index))}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {query && searchResults.length === 0 && !loading && showDropdown && (
                                    <div className="position-absolute" id='search-dropdown'
                                        style={{
                                            width: 'calc(32% - 2px)',
                                            backgroundColor: '#FFF',
                                            border: '1px solid #CCC',
                                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                            maxHeight: 300,
                                            overflowY: 'auto',
                                            left: 'calc(32.3rem - 2px)',
                                            top: 4 + 'rem',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        <div
                                            className="dropdown-item"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                borderBottom: '1px solid #e0e0e0',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div>
                                                <p>Không tìm thấy tên sách</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <li className="nav-item">
                                    <div className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faBell} id="nav-icon" /> <p>Thông báo</p>
                                    </div>
                                    <ul className="dropdown-menu user-nav" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="/user/notification">
                                            <p>Bạn đã đặt một đơn hàng</p>
                                        </a></li>
                                        <li><a className="dropdown-item" href="/user/notification">
                                            <p>Đơn hàng của bạn đã được chuyển đến bạn</p>
                                        </a></li>
                                    </ul>
                                </li>
                                {
                                    role && role.includes('CUSTOMER') ?
                                        <li className="nav-item">
                                            <a className="nav-link" href="/cart">
                                                <FontAwesomeIcon icon={faCartShopping} id="nav-icon" /> <p>Giỏ hàng</p>
                                            </a>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <div className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faCartShopping} id="nav-icon" /> <p>Giỏ hàng</p>
                                            </div>
                                            <ul className="dropdown-menu user-nav" aria-labelledby="navbarDropdownMenuLink">
                                                <p style={{
                                                    fontSize: 14 + 'px',
                                                    textAlign: "center",
                                                    padding: 0 + 5 + 'px'
                                                }}>Vui lòng đăng nhập để xem giỏ hàng</p>
                                                <div style={{ textAlign: "center" }}>
                                                    <a className="btn" href="/login" role="button" style={style}>Đăng nhập</a>
                                                </div>
                                            </ul>
                                        </li>
                                }
                                {
                                    role ?
                                        <li className="nav-item dropdown">
                                            <div className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faUser} id="nav-icon" /> <p style={{
                                                    textTransform: "capitalize",
                                                    textOverflow: 'clip',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    width: 39 + 'px'
                                                }}>{username}</p>
                                            </div>
                                            <ul className="dropdown-menu user-nav" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a className="dropdown-item" href="/user/account">
                                                    <FontAwesomeIcon icon={faUser} id="account-icon" /><p>Thông tin tài khoản</p>
                                                </a></li>
                                                <li><a className="dropdown-item" href="/user/sales/order/history">
                                                    <FontAwesomeIcon icon={faFileInvoice} id="account-icon" /><p>Đơn hàng của tôi</p>
                                                </a></li>
                                                <hr className="dropdown-divider" style={{ color: "gray" }} />
                                                <li><a className="dropdown-item" onClick={handleLogout}>
                                                    <FontAwesomeIcon icon={faSignOut} id="account-icon" /><p>Thoát đăng nhập</p>
                                                </a></li>
                                            </ul>
                                        </li>
                                        :
                                        <li className="nav-item dropdown">
                                            <div className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FontAwesomeIcon icon={faUser} id="nav-icon" /> <p>Tài khoản</p>
                                            </div>
                                            <ul className="dropdown-menu user-nav" aria-labelledby="navbarDropdownMenuLink">
                                                <p style={{ fontSize: 14 + 'px', textAlign: "center" }}>Vui lòng đăng nhập</p>
                                                <div style={{ textAlign: "center" }}>
                                                    <a className="btn" href="/login" role="button" style={style}>Đăng nhập</a>
                                                </div>
                                            </ul>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;