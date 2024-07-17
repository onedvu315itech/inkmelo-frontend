import { Component } from "react";
import { Box, Modal } from "@mui/material";
import 'style/css/Category.css';
import _ from 'lodash';

class ModalDisplayUserOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            customer: {
                fullname: '',
                email: '',
                lastUpdatedTime: ''
            },
            orderPrice: '',
            shippingFee: '',
            totalPrice: '',
            quantity: '',
            shipmentStreet: '',
            shipmentWard: '',
            shipmentProvince: '',
            receiverName: '',
            contactNumber: '',
            status: '',
            createdAt: '',
            detail: []
        }
    }

    componentDidMount() {
        let order = this.props.currentUserOrder;
        if (order && !_.isEmpty(order)) {
            this.setState({
                id: order.id,
                customer: order.customer,
                orderPrice: order.orderPrice,
                shippingFee: order.shippingFee,
                totalPrice: order.totalPrice,
                quantity: order.quantity,
                shipmentStreet: order.shipmentStreet,
                shipmentWard: order.shipmentWard,
                shipmentProvince: order.shipmentProvince,
                receiverName: order.receiverName,
                contactNumber: order.contactNumber,
                status: order.status,
                createdAt: order.createdAt,
                detail: order.detail
            });
        }
    }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 10,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    handleClose = () => this.props.toggle();

    render() {
        const { customer, detail } = this.state;
        return (
            <>
                <Modal
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={this.style}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết đơn hàng</h5>
                            <span className="justify-content-end inline-block">
                                <button type="button" className="btn-close"
                                    onClick={this.handleClose}></button>
                            </span>
                        </div>
                        <div className="modal-body pop-up-body">
                            <div className="form-group col-12">
                                <div className="col-12">
                                    <label htmlFor="order-id" className="col-form-label">ID:</label>
                                    <input type="text" className="form-control" readOnly
                                        value={this.state.id || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="customer-name" className="col-form-label">Tên khách hàng:</label>
                                    <input type="text" className="form-control" readOnly
                                        value={customer.fullname || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="customer-email" className="col-form-label">Email khách hàng:</label>
                                    <input type="email" className="form-control" readOnly
                                        value={customer.email || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="order-price" className="col-form-label">Giá đơn hàng:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.orderPrice || 'VNĐ'}
                                />
                                <label htmlFor="shipping-fee" className="col-form-label">Phí vận chuyển:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.shippingFee || ''}
                                />
                                <label htmlFor="total-price" className="col-form-label">Tổng giá:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.totalPrice || ''}
                                />
                                <label htmlFor="quantity" className="col-form-label">Số lượng:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.quantity || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="shipment-address" className="col-form-label">Địa chỉ giao hàng:</label>
                                <textarea className="form-control" readOnly
                                    value={`${this.state.shipmentStreet}, ${this.state.shipmentWard}, ${this.state.shipmentProvince}` || ''}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="receiver-name" className="col-form-label">Tên người nhận:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.receiverName || ''}
                                />
                                <label htmlFor="contact-number" className="col-form-label">Số điện thoại:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.contactNumber || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="order-status" className="col-form-label">Trạng thái thanh toán:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.status || ''}
                                />
                                <label htmlFor="created-at" className="col-form-label">Ngày tạo:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.createdAt || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="order-details" className="col-form-label">Chi tiết đơn hàng:</label>
                                {detail.map((item, index) => (
                                    <div key={index} className="order-detail-item">
                                        <label htmlFor={`item-title-${index}`} className="col-form-label">Tên gói sách:</label>
                                        <input type="text" className="form-control" readOnly
                                            value={item.bookPackage.title || ''}
                                        />
                                        <label htmlFor={`item-quantity-${index}`} className="col-form-label">Số lượng:</label>
                                        <input type="text" className="form-control" readOnly
                                            value={item.quantity || ''}
                                        />
                                        <label htmlFor={`item-price-${index}`} className="col-form-label">Giá:</label>
                                        <input type="text" className="form-control" readOnly
                                            value={item.itemPrice || ''}
                                        />
                                        <img src={item.bookPackage.book.bookCoverImg} alt="Book Cover" height={100} style={{ display: "block" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-cancel"
                                onClick={this.handleClose}>Đóng</button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    };
}

export default ModalDisplayUserOrder;
