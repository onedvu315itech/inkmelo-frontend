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
            userDisplay: {},
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
        if (res) this.setState({ listUserOrder: res.data })
    }

    handleDisplayUserOrder = (user) => {
        this.setState({
            isOpenedModalUserOrder: true,
            userDisplay: user
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
                                currentUserOrder={this.state.userDisplay}
                                displayUserOrder={this.handleDisplayUserOrder}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Vị trí</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listUserOrder &&
                                    Array.isArray(this.state.listUserOrder) ? this.state.listUserOrder.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.fullname}</td>
                                                <td>{data.email}</td>
                                                <td>{data.role}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleDisplayUserOrder(data)}>
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

export default UserOrder