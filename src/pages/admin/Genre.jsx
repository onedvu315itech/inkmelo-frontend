
// project import
import MainCard from 'components/MainCard';
import { Component } from 'react';
import productService from 'services/productServices';
import ModalCreateGenre from 'modals/ModalCreateGenre';
import ModalUpdateGenre from 'modals/ModalUpdateGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';


// ==============================|| SAMPLE PAGE ||============================== //

class Genre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGenre: [],
            isOpenedModalCreateGenre: false,
            isOpenedModalUpdateGenre: false,
            genreUpdate: {},
            genreCreate: {},
        }
    }


    toggleCreateGenreModal = () => {
        this.setState({
            isOpenedModalCreateGenre: !this.state.isOpenedModalCreateGenre
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
        if (res) this.setState({ listGenre: res.data })

    }

    // For add new genre
    handleAddNewGenre = (Genre) => {
        this.setState({
            isOpenedModalCreateGenre: true,
            GenreCreate: Genre
        });
    }

    doCreateGenre = async (Genre) => {
        try {

            let res = await productService.createGenre(Genre);
            if (res) {
                this.setState({
                    isOpenedModalCreateGenre: false,
                    listGenre: Genre,
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
                                genreInfor={this.state.genreCreate}
                                createGenre={this.doCreateGenre}
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

export default Genre;