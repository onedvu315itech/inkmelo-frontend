// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import productServices from 'services/productServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';
import ModalUpdateBookItem from 'modals/ModalUpdateBookItem';
import ModalCreateBookItem from 'modals/ModalCreateBookItem';

// ==============================|| SAMPLE PAGE ||============================== //

class BookItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listBookItem: [],
            isOpenedModalUpdateBookItem: false,
            isOpenedModalCreateBookItem: false,
            bookItemUpdate: {},
            bookItemCreate: {}
        }
    }

    toggleUpdateBookItem = () => {
        this.setState({
            isOpenedModalUpdateBookItem: !this.state.isOpenedModalUpdateBookItem
        });
    }

    toggleCreateBookItem = () => {
        this.setState({
            isOpenedModalCreateBookItem: !this.state.isOpenedModalCreateBookItem
        });
    }

    async componentDidMount() {
        await this.getAllBookItem();
    }

    getAllBookItem = async () => {
        let res = await productServices.getAllBookItem();
        if (res) this.setState({ listBookItem: res.data });
    }

    // For add new Book Item
    handleAddNewBookItem = (bookItem) => {
        this.setState({
            isOpenedModalCreateBookItem: true,
            bookItemCreate: bookItem
        });
    }

    doCreateBookItem = async (bookItem) => {
        try {
            let res = await productServices.createBookItem(bookItem);
            if (res) {
                this.setState({
                    isOpenedModalCreateBookItem: false,
                    listBookItem: bookItem,
                });
                await this.getAllBookItem();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //For update BookItem
    handleUpdateBookItem = (bookItem) => {
        this.setState({
            isOpenedModalUpdateBookItem: true,
            bookItemUpdate: bookItem
        });
    }

    doUpdateUpdateBookItem = async (bookItem) => {
        try {
            let res = await productServices.updateBookItem(bookItem);
            if (res) {
                this.setState({
                    isOpenedModalUpdateBookItem: false,
                    listBookItem: bookItem,
                })
                await this.getAllBookItem();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete Book item
    handleDeleteBookItem = async (bookItem) => {
        try {
            let res = await productServices.deleteBookItem(bookItem.id);
            if (res) {
                this.setState({
                    isOpenedModalUpdateBookItem: false,
                    listBookItem: bookItem,
                })

                await this.getAllBookItem();
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
                            onClick={this.handleAddNewBookItem}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreateBookItem &&
                            <ModalCreateBookItem
                                open={this.state.isOpenedModalCreateBookItem}
                                toggle={this.toggleCreateBookItem}
                                bookItemInfor={this.state.bookItemCreate}
                                createBookItem={this.doCreateBookItem}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdateBookItem &&
                            <ModalUpdateBookItem
                                open={this.state.isOpenedModalUpdateBookItem}
                                toggle={this.toggleUpdateBookItem}
                                currentBookItem={this.state.bookItemUpdate}
                                updateBookItem={this.doUpdateUpdateBookItem}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listBookItem &&
                                    Array.isArray(this.state.listBookItem) ? this.state.listBookItem.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.bookTitle}</td>
                                                <td>{data.type}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleUpdateBookItem(data)}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => { this.handleDeleteBookItem(data) }}
                                                    >
                                                        Ngưng hoạt động
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
export default BookItem;