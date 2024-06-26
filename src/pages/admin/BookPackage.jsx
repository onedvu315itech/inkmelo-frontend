
// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import productService from 'services/productServices';
import ModalCreateBookPackage from 'modals/ModalCreateBookPackage';
import ModalUpdateBookPackage from 'modals/ModalUpdateBookPackage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';


// ==============================|| SAMPLE PAGE ||============================== //

class BookPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBookPackage: [],
            isOpenedModalCreateBookPackage: false,
            isOpenedModalUpdateBookPackage: false,
            bookPackageUpdate: {},
            bookPackageCreate: {},
        }
    }


    toggleCreateBookPackageModal = () => {
        this.setState({
            isOpenedModalCreateBookPackage: !this.state.isOpenedModalCreateBookPackage
        });
    }

    toggleUpdateBookPackageModal = () => {
        this.setState({
            isOpenedModalUpdateBookPackage: !this.state.isOpenedModalUpdateBookPackage
        });
    }

    async componentDidMount() {
        await this.getAllBookPackage();
    }

    getAllBookPackage = async () => {
        let res = await productService.getAllBookPackage();
        if (res) this.setState({ listBookPackage: res.data })

    }

    // For add new book package
    handleAddNewBookPackage = (BookPackage) => {
        this.setState({
            isOpenedModalCreateBookPackage: true,
            BookPackageCreate: BookPackage
        });
    }

    doCreateBookPackage = async (BookPackage) => {
        try {

            let res = await productService.createBookPackage(BookPackage);
            if (res) {
                this.setState({
                    isOpenedModalCreateBookPackage: false,
                    listBookPackage: BookPackage,
                })
                await this.getAllBookPackage();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //For update genre
    handleUpdateBookPackage = (bookPackage) => {
        this.setState({
            isOpenedModalUpdateBookPackage: true,
            bookPackageUpdate: bookPackage
        });
    }

    doUpdateBookPackage = async (bookPackage) => {
        try {
            let res = await productService.updateBookPackage(bookPackage);
            if (res) {
                this.setState({
                    isOpenedModalUpdateBookPackage: false,
                    listBookPackage: bookPackage,
                })
                await this.getAllBookPackage();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete BookPackage
    handleDeleteBookPackage = async (bookPackage) => {
        try {
            let res = await productService.deleteBookPackage(bookPackage.id);
            if (res) {

                this.setState({
                    isOpenedModalUpdateBookPackage: false,
                    listBookPackage: bookPackage,
                })

                await this.getAllBookPackage();
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
                            onClick={this.handleAddNewBookPackage}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreateBookPackage &&
                            <ModalCreateBookPackage
                                open={this.state.isOpenedModalCreateBookPackage}
                                toggle={this.toggleCreateBookPackageModal}
                                genreInfor={this.state.bookPackageCreate}
                                createBookPackage={this.doCreateBookPackage}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdateBookPackage &&
                            <ModalUpdateBookPackage
                                open={this.state.isOpenedModalUpdateBookPackage}
                                toggle={this.toggleUpdateBookPackageModal}
                                currentBookPackage={this.state.bookPackageUpdate}
                                updateBookPackage={this.doUpdateBookPackage}
                            />
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Gói</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listBookPackage &&
                                    Array.isArray(this.state.listBookPackage) ? this.state.listBookPackage.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.title}</td>
                                                <td>{data.description}</td>
                                                <td>{data.status}</td>


                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleUpdateBookPackage(data)}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => { this.handleDeleteBookPackage(data) }}>
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

export default BookPackage;