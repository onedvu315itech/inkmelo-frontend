// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import orderServices from 'services/orderServices';
import ModalUserOrder from 'modals/ModalDisplayUserOrder';

class UserOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listUserOrder: [],
            isOpenedModalUserOrder: false,
            userOrderDisplay: {},
        }
    }

    toggleUserOrderModal = () => {
        this.setState({
            isOpenedModalUserOrder: !this.state.isOpenedModalUserOrder
        });
    }

    async componentDidMount() {
        await this.getAllUserOrder();
    }

    getAllUserOrder = async () => {
        let res = await orderServices.getAllUserOrder();
        console.log(res)
        if (res) this.setState({ listUserOrder: res.data.items })
    }

    handleDisplayUserOrder = (user) => {
        this.setState({
            isOpenedModalUserOrder: true,
            userOrderDisplay: user
        })
    }

    render() {
        return (
            <>
                <MainCard>
                    <div className='mx-1'>
                        {
                            this.state.isOpenedModalUserOrder &&
                            <ModalUserOrder
                                open={this.state.isOpenedModalUserOrder}
                                toggle={this.toggleUserOrderModal}
                                currentUserOrder={this.state.userOrderDisplay}
                                displayUserOrder={this.handleDisplayUserOrder}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID đơn hàng</th>
                                <th scope="col">Tên khách hàng</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tổng giá tiền</th>
                                <th scope="col">Tình trạng thanh toán</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listUserOrder &&
                                    Array.isArray(this.state.listUserOrder) ? this.state.listUserOrder.map((order, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{order.id}</td>
                                                <td>{order.customer.fullname}</td>
                                                <td>{order.customer.email}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleDisplayUserOrder(order)}>
                                                        Xem chi tiết
                                                    </button>
                                                </td >
                                            </tr >
                                        );
                                    }) : null
                            }
                        </tbody >
                    </table >
                </MainCard>
            </>
        )
    }
}

export default UserOrder;
