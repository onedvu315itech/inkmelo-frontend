import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/icons/logo.png'
import '../../style/css/Navbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faCircle, faFileInvoice, faHeart, faMagnifyingGlass, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import cartServices from 'services/cartServices';

const Navbar = () => {
    const role = localStorage.getItem('roles');
    const username = localStorage.getItem('username');
    let [quantity, setQuantity] = useState(0);

    useEffect(() => {
        let fetchCart = async () => {
            let resOfCart = await cartServices.getAllCart();
            if (resOfCart) setQuantity(resOfCart.data.length);
        };
        fetchCart();
    }, []);

    let style = {
        color: '#000000',
        backgroundColor: '#F5F5F5',
        border: 1 + 'px solid rgb(220, 120, 0)'
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
                                    <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="/">
                                        InkMelo
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
                                                        <li><a className="dropdown-item explore-home-item" href="#unique-content">Nội dung độc
                                                            quyền</a></li>
                                                        <li><a className="dropdown-item explore-home-item" href="#mobile-app-intro">Ứng dụng
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
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control" type="search" placeholder="Tìm kiếm sản phẩm" aria-label="Search" />
                                    <button id="icon-search" className="btn bg-unset" type="submit">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button>
                                </form>
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
                                            {
                                                role.includes('CUSTOMER') &&
                                                <div className="count-container">
                                                    <FontAwesomeIcon icon={faCircle} id="circle-count" />
                                                    <span id="cart-count">{quantity}</span>
                                                </div>
                                            }
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
                                                <FontAwesomeIcon icon={faUser} id="nav-icon" /> <p style={{ textTransform: "capitalize" }}>{username}</p>
                                            </div>
                                            <ul className="dropdown-menu user-nav" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a className="dropdown-item" href="/user/account">
                                                    <FontAwesomeIcon icon={faUser} id="account-icon" /><p>Thông tin tài khoản</p>
                                                </a></li>
                                                <li><a className="dropdown-item" href="/user/sales/order/history">
                                                    <FontAwesomeIcon icon={faFileInvoice} id="account-icon" /><p>Đơn hàng của tôi</p>
                                                </a></li>
                                                <li><a className="dropdown-item" href="/user/wish-list">
                                                    <FontAwesomeIcon icon={faHeart} id="account-icon" /><p>Sản phẩm yêu thích</p>
                                                </a></li>
                                                <hr className="dropdown-divider" style={{ color: "gray" }} />
                                                <li><a className="dropdown-item" href="/login">
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
            </div >
        </div >
    );
};

export default Navbar;
