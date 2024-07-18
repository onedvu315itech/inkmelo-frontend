// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import userServices from 'services/userServices';
import ModalUser from 'modals/ModalDisplayUser';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listUser: [],
            isOpenedModalUser: false,
            userDisplay: {},
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenedModalUser: !this.state.isOpenedModalUser
        });
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let res = await userServices.getAllUser();
        if (res) {
            let sortedUsers = res.data.sort((a, b) => a.id - b.id);
            this.setState({ listUser: sortedUsers });
        }
    }

    handleDisplayUser = (user) => {
        this.setState({
            isOpenedModalUser: true,
            userDisplay: user
        })
    }

    render() {
        return (
            <>
                <MainCard>
                    <div className='mx-1'>
                        {
                            this.state.isOpenedModalUser &&
                            <ModalUser
                                open={this.state.isOpenedModalUser}
                                toggle={this.toggleUserModal}
                                currentUser={this.state.userDisplay}
                                displayUser={this.handleDisplayUser}
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
                                this.state.listUser &&
                                    Array.isArray(this.state.listUser) ? this.state.listUser.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.fullname}</td>
                                                <td>{data.email}</td>
                                                <td>{data.role}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleDisplayUser(data)}>
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

export default User