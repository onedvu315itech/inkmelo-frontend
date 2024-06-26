// project import
import MainCard from 'components/MainCard';
import productServices from 'services/productServices';
import { Component } from "react";
import ModalCreatePublisher from 'modals/ModalCreatePublisher';
import ModalUpdatePublisher from 'modals/ModalUpdatePublisher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';

class Publisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPublisher: [],
            isOpenedModalCreatePublisher: false,
            isOpenedModalUpdatePublisher: false,
            publisherUpdate: {},
            publisherCreate: {},
        }
    }

    toggleCreatePublisherModal = () => {
        this.setState({
            isOpenedModalCreatePublisher: !this.state.isOpenedModalCreatePublisher
        });
    }

    toggleUpdatePublisherModal = () => {
        this.setState({
            isOpenedModalUpdatePublisher: !this.state.isOpenedModalUpdatePublisher
        });
    }

    async componentDidMount() {
        await this.getAllPublisher();
    }

    getAllPublisher = async () => {
        let res = await productServices.getAllPublisher();
        if (res) this.setState({ listPublisher: res.data })

    }
    // For add new publisher
    handleAddNewPublisher = (publisher) => {
        this.setState({
            isOpenedModalCreatePublisher: true,
            publisherCreate: publisher
        });
    }

    doCreatePublisher = async (publisher) => {
        try {
            let res = await productServices.createPublisher(publisher);
            if (res) {
                this.setState({
                    isOpenedModalCreatePublisher: false,
                    listPublisher: publisher,
                })
                await this.getAllPublisher();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //For update publisher
    handleUpdatePublisher = (publisher) => {
        this.setState({
            isOpenedModalUpdatePublisher: true,
            publisherUpdate: publisher
        });
    }

    doUpdatePublisher = async (publisher) => {
        try {
            let res = await productServices.updatePublisher(publisher);
            if (res) {
                this.setState({
                    isOpenedModalUpdatePublisher: false,
                    listPublisher: publisher,
                })
                await this.getAllPublisher();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete Publisher
    handleDeletePublisher = async (publisher) => {
        try {
            let res = await productServices.deletePublisher(publisher.id);
            if (res) {
                this.setState({
                    isOpenedModalUpdatePublisher: false,
                    listPublisher: publisher,
                });

                await this.getAllPublisher();
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <MainCard>
                    <div className='mx-1'>
                        <button className='btn btn-primary px'
                            style={{ backgroundColor: "green", marginBottom: 2 + "rem" }}
                            onClick={this.handleAddNewPublisher}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreatePublisher &&
                            <ModalCreatePublisher
                                open={this.state.isOpenedModalCreatePublisher}
                                toggle={this.toggleCreatePublisherModal}
                                publisherInfo={this.state.publisherCreate}
                                createPublisher={this.doCreatePublisher}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdatePublisher &&
                            <ModalUpdatePublisher
                                open={this.state.isOpenedModalUpdatePublisher}
                                toggle={this.toggleUpdatePublisherModal}
                                currentPublisher={this.state.publisherUpdate}
                                updatePublisher={this.doUpdatePublisher}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listPublisher &&
                                    Array.isArray(this.state.listPublisher) ? this.state.listPublisher.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleUpdatePublisher(data)}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => { this.handleDeletePublisher(data) }}
                                                    >
                                                        Xóa
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

export default Publisher;