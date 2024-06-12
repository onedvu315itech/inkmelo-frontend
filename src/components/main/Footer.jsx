import React from 'react'
import logo from '../../assets/images/icons/logo.png'
import logoSaleNoti from '../../assets/third-party/logoSaleNoti.png'
import logoGHN from '../../assets/third-party/logo-GHN.png'
import logoVNPAY from '../../assets/third-party/logo-VNPAY.png'
import '../../style/css/Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faGoogle, faInstagram, faPinterest, faTiktok } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className="my-5">
            <footer className="text-center text-lg-start  main-footer">
                <div className="container p-2">
                    <section className="head-footer">
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xl-4 footer-start">
                                <a href="/"><img src={logo} alt="inkmelo-logo" /></a>
                                <p className="footer-start-name">Công Ty Cổ Phần Phát Hành Sách - InkMelo</p>
                                <p className="footer-start-text">Giấy CNĐKKD: 0123456789, đăng ký lần đầu ngày 31/05/2024
                                    cấp bởi Sở KHĐT thành phố Hồ Chí Minh.</p>
                                <p className="footer-start-text">
                                    InkMelo nhận đặt hàng trực tuyến và giao hàng tận nơi.
                                    KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng
                                    cũng như tất cả Hệ Thống InkMelo trên toàn quốc.
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-sm-6 col-md-4 col-sms-6 col-smb-12 mx-auto mt-3 footer-middle">
                                        <p className="footer-start-title mb-4">dịch vụ</p>
                                        <p>
                                            <a href="/terms-of-use" className="footer-middle-link">Điều khoản sử dụng</a>
                                        </p>
                                        <p>
                                            <a href="/privacy-policy" className="footer-middle-link">Chính sách bảo mật thông tin cá nhân</a>
                                        </p>
                                        <p>
                                            <a href="/payment-policy" className="footer-middle-link">Chính sách bảo mật thanh toán</a>
                                        </p>
                                        <p>
                                            <a href='/inkmelo-introduction' className="footer-middle-link">Giới thiệu InkMelo</a>
                                        </p>
                                    </div>

                                    <hr className="w-100 clearfix d-md-none" />

                                    <div className="col-sm-6 col-md-4 col-sms-6 col-smb-12 mx-auto mt-3 footer-middle">
                                        <p className="footer-start-title mb-4">
                                            hỗ trợ
                                        </p>
                                        <p>
                                            <a className="footer-middle-link">Chính sách đổi - trả - hoàn tiền</a>
                                        </p>
                                        <p>
                                            <a className="footer-middle-link">Chính sách bảo hành - bồi hoàn</a>
                                        </p>
                                        <p>
                                            <a className="footer-middle-link">Chính sách vận chuyển</a>
                                        </p>
                                        <p>
                                            <a className="footer-middle-link">Phương thức thanh toán và xuất HĐ</a>
                                        </p>
                                    </div>

                                    <hr className="w-100 clearfix d-md-none" />

                                    <div className="col-sm-6 col-md-4 col-sms-6 col-smb-12 mx-auto mt-3 footer-middle">
                                        <p className="footer-start-title mb-4">liên hệ</p>
                                        <p className="footer-middle-contact"><FontAwesomeIcon icon={faLocationPin} /> Nhà văn hóa sinh viên, Dĩ An, Bình Dương</p>
                                        <p className="footer-middle-contact"><FontAwesomeIcon icon={faEnvelope} /> cskh@inkmelo.com.vn</p>
                                        <p className="footer-middle-contact"><FontAwesomeIcon icon={faPhone} /> 1900310503</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="end-footer">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-4 col-lg-4 text-center text-md-start">
                                <div>
                                    <a href="http://online.gov.vn/Home/">
                                        <img src={logoSaleNoti} alt="verify" />
                                    </a>
                                </div>
                                <div className="mt-3">
                                    <p>Tìm hiểu chúng tôi trên</p>
                                    <a className="btn btn-outline-light btn-floating m-1 ">
                                        <FontAwesomeIcon icon={faFacebook} className="end-footer-logo" />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1 ">
                                        <FontAwesomeIcon icon={faInstagram} className="end-footer-logo" />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1 ">
                                        <FontAwesomeIcon icon={faTiktok} className="end-footer-logo" />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1 ">
                                        <FontAwesomeIcon icon={faPinterest} className="end-footer-logo" />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1 ">
                                        <FontAwesomeIcon icon={faGoogle} className="end-footer-logo" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-md-8 col-lg-8 ml-lg-0">
                                <div className="end-footer-image-container">
                                    <img src={logoGHN} alt="giao-hang-nhanh" />
                                </div>
                                <div className="end-footer-image-container">
                                    <img src={logoVNPAY} alt="vn-pay" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </div >
    )
}

export default Footer