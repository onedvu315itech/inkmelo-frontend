// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import productService from 'services/productServices';
import ModalCreateGenre from 'modals/ModalCreateGenre';
import ModalDisplayGenre from 'modals/ModalDisplayGenre'
import ModalUpdateGenre from 'modals/ModalUpdateGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';

class Genre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGenre: [],
            isOpenedModalCreateGenre: false,
            isOpenedModalUpdateGenre: false,
            isOpenedModalDisplayGenre: false,
            genreDisplay: {},
            genreUpdate: {}
        }
    }

    toggleCreateGenreModal = () => {
        this.setState({
            isOpenedModalCreateGenre: !this.state.isOpenedModalCreateGenre
        });
    }

    toggleDisplayGenreModal = () => {
        this.setState({
            isOpenedModalDisplayGenre: !this.state.isOpenedModalDisplayGenre
        });
    }

    toggleUpdateGenreModal = () => {
        this.setState({
            isOpenedModalUpdateGenre: !this.state.isOpenedModalUpdateGenre
        });
    }

    async componentDidMount() {
        await this.getAllGenre();
    }

    getAllGenre = async () => {
        let res = await productService.getAllGenre();
        if (res)
            this.setState({ listGenre: res.data });
    }


    //Display genre
    handleDisplayGenre = (genre) => {
        this.setState({
            isOpenedModalDisplayGenre: true,
            genreDisplay: genre
        })
    }
    // For add new genre
    handleAddNewGenre = () => {
        this.setState({
            isOpenedModalCreateGenre: true
        });
    }

    doCreateGenre = async (genre) => {
        try {
            let res = await productService.createGenre(genre);
            if (res) {
                this.setState({
                    isOpenedModalCreateGenre: false,
                    listGenre: genre,
                })
                await this.getAllGenre();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //For update genre
    handleUpdateGenre = (genre) => {
        this.setState({
            isOpenedModalUpdateGenre: true,
            genreUpdate: genre
        });
    }

    doUpdateGenre = async (genre) => {
        try {
            let res = await productService.updateGenre(genre);
            if (res) {
                this.setState({
                    isOpenedModalUpdateGenre: false,
                    listGenre: genre,
                })
                await this.getAllGenre();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete Genre
    handleDeleteGenre = async (genre) => {
        try {
            let res = await productService.deleteGenre(genre.id);
            if (res) {
                this.setState({
                    isOpenedModalUpdateGenre: false,
                    listGenre: genre,
                })

                await this.getAllGenre();
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
                            onClick={this.handleAddNewGenre}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreateGenre &&
                            <ModalCreateGenre
                                open={this.state.isOpenedModalCreateGenre}
                                toggle={this.toggleCreateGenreModal}
                                createGenre={this.doCreateGenre}
                            />
                        }
                        {
                            this.state.isOpenedModalDisplayGenre &&
                            <ModalDisplayGenre
                                open={this.state.isOpenedModalDisplayGenre}
                                toggle={this.toggleDisplayGenreModal}
                                genre={this.state.genreDisplay}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdateGenre &&
                            <ModalUpdateGenre
                                open={this.state.isOpenedModalUpdateGenre}
                                toggle={this.toggleUpdateGenreModal}
                                currentGenre={this.state.genreUpdate}
                                updateGenre={this.doUpdateGenre}
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
                                this.state.listGenre &&
                                    Array.isArray(this.state.listGenre) ? this.state.listGenre.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.status}</td>


                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleDisplayGenre(data)}>
                                                        Xem chi tiết
                                                    </button>
                                                    <button type="button" className="btn btn-primary"
                                                        style={{
                                                            marginLeft: 1 + "rem",
                                                            color: "white",
                                                            backgroundColor: "#FF6600",
                                                            borderColor: "#FF6600"
                                                        }}
                                                        onClick={() => this.handleUpdateGenre(data)}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => { this.handleDeleteGenre(data) }}>
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

export default Genre;