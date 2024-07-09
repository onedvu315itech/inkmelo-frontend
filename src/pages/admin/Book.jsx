import MainCard from 'components/MainCard';
import { Component } from 'react';
import productService from 'services/productServices';
import ModalCreateBook from 'modals/ModalCreateBook';
import ModalUpdateBook from 'modals/ModalUpdateBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBook: [],
            isOpenedModalCreateBook: false,
            isOpenedModalUpdateBook: false,
            bookUpdate: {}
        }
    }

    toggleCreateBookModal = () => {
        this.setState({
            isOpenedModalCreateBook: !this.state.isOpenedModalCreateBook
        });
    }

    toggleUpdateBookModal = () => {
        this.setState({
            isOpenedModalUpdateBook: !this.state.isOpenedModalUpdateBook
        });
    }

    async componentDidMount() {
        await this.getAllBook();
    }

    getAllBook = async () => {
        let res = await productService.getAllBook();
        if (res)
            this.setState({ listBook: res.data });
    }

    // For add new book
    handleAddNewBook = () => {
        this.setState({
            isOpenedModalCreateBook: true
        });
    }

    doCreateBook = async (book) => {
        try {
            let res = await productService.createBook(book);
            if (res) {
                this.setState({
                    isOpenedModalCreateBook: false,
                    listBook: book,
                })
                await this.getAllBook();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    // For update book
    handleUpdateBook = (book) => {
        this.setState({
            isOpenedModalUpdateBook: true,
            bookUpdate: book
        });
    }

    doUpdateBook = async (book) => {
        try {
            let res = await productService.updateBook(book);
            if (res) {
                this.setState({
                    isOpenedModalUpdateBook: false,
                    listBook: book,
                })
                await this.getAllBook();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete Book
    handleDeleteBook = async (book) => {
        try {
            let res = await productService.deleteBook(book.id);
            if (res) {
                this.setState({
                    isOpenedModalUpdateBook: false,
                    listBook: book,
                })

                await this.getAllBook();
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
                            onClick={this.handleAddNewBook}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreateBook &&
                            <ModalCreateBook
                                open={this.state.isOpenedModalCreateBook}
                                toggle={this.toggleCreateBookModal}
                                createBook={this.doCreateBook}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdateBook &&
                            <ModalUpdateBook
                                open={this.state.isOpenedModalUpdateBook}
                                toggle={this.toggleUpdateBookModal}
                                currentBook={this.state.bookUpdate}
                                updateBook={this.doUpdateBook}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col" className='col-4'>Tên sách</th>
                                <th scope="col">Tác giả</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thao tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listBook &&
                                    Array.isArray(this.state.listBook) ? this.state.listBook.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.title}</td>
                                                <td>{data.author}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleUpdateBook(data)}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => this.handleDeleteBook(data)}>
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

export default Book;