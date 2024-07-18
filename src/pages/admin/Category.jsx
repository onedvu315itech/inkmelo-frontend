// project import
import MainCard from 'components/MainCard';
import productService from "services/productServices";
import { Component } from "react";
import ModalUpdateCategory from 'modals/ModalUpdateCategory';
import ModalCreateCategory from 'modals/ModalCreateCategory';
import ModalDisplayCategory from 'modals/ModalDisplayCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { emitter } from 'utils/emitter';


// ==============================|| SAMPLE PAGE ||============================== //

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            isOpenedModalCreateCategory: false,
            isOpenedModalUpdateCategory: false,
            isOpenedModalDisplayCategory: false,
            categoryDisplay: {},
            categoryUpdate: {},
        }
    }

    toggleUpdateCategoryModal = () => {
        this.setState({
            isOpenedModalUpdateCategory: !this.state.isOpenedModalUpdateCategory
        });
    }
    toggleDisplayCategoryModal = () => {
        this.setState({
            isOpenedModalDisplayCategory: !this.state.isOpenedModalDisplayCategory
        });
    }

    toggleCreateCategoryModal = () => {
        this.setState({
            isOpenedModalCreateCategory: !this.state.isOpenedModalCreateCategory
        });
    }

    async componentDidMount() {
        await this.getAllCategory();
    }

    getAllCategory = async () => {
        let res = await productService.getAllCategory();
        if (res) {
            let sortedCategories = res.data.sort((a, b) => a.id - b.id);
            this.setState({ listCategory: sortedCategories })
        }
    }
    //Display category
    handleDisplayCategory = (category) => {
        this.setState({
            isOpenedModalDisplayCategory: true,
            categoryDisplay: category
        })
    }

    // For add new category
    handleAddNewCatergory = () => {
        this.setState({
            isOpenedModalCreateCategory: true
        });
    }

    doCreateCategory = async (category) => {
        try {
            // let res = await productService.createCategory(category);
            // console.log('Res from create category ', res);
            let res = await productService.createCategory(category);
            if (res) {
                this.setState({
                    isOpenedModalCreateCategory: false,
                    listCategory: category,
                })
                await this.getAllCategory();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //For update category
    handleUpdateCategory = (category) => {
        this.setState({
            isOpenedModalUpdateCategory: true,
            categoryUpdate: category
        });
    }

    doUpdateCategory = async (category) => {
        try {
            let res = await productService.updateCategory(category);
            if (res) {
                this.setState({
                    isOpenedModalUpdateCategory: false,
                    listCategory: category,
                })
                await this.getAllCategory();
            }
        } catch (err) {
            console.log(err)
        }
    }

    // For delete category
    handleDeleteCategory = async (category) => {
        try {
            let res = await productService.deleteCategory(category.id);
            if (res) {

                this.setState({
                    isOpenedModalUpdateCategory: false,
                    listCategory: category,
                })

                await this.getAllCategory();
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
                            onClick={this.handleAddNewCatergory}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </button>
                        {
                            this.state.isOpenedModalCreateCategory &&
                            <ModalCreateCategory
                                open={this.state.isOpenedModalCreateCategory}
                                toggle={this.toggleCreateCategoryModal}
                                createCategory={this.doCreateCategory}
                            />
                        }
                        {
                            this.state.isOpenedModalDisplayCategory &&
                            <ModalDisplayCategory
                                open={this.state.isOpenedModalDisplayCategory}
                                toggle={this.toggleDisplayCategoryModal}
                                category={this.state.categoryDisplay}
                            />
                        }
                        {
                            this.state.isOpenedModalUpdateCategory &&
                            <ModalUpdateCategory
                                open={this.state.isOpenedModalUpdateCategory}
                                toggle={this.toggleUpdateCategoryModal}
                                currentCategory={this.state.categoryUpdate}
                                updateCategory={this.doUpdateCategory}
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
                                this.state.listCategory &&
                                    Array.isArray(this.state.listCategory) ? this.state.listCategory.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td> {data.status} </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary"
                                                        onClick={() => this.handleDisplayCategory(data)}>
                                                        Xem chi tiết
                                                    </button>
                                                    <button type="button" className="btn btn-primary"
                                                        style={{
                                                            marginLeft: 1 + "rem",
                                                            color: "white",
                                                            backgroundColor: "#FF6600",
                                                            borderColor: "#FF6600"
                                                        }}
                                                        onClick={() => { this.handleUpdateCategory(data) }}>
                                                        Cập nhật
                                                    </button>
                                                    <button type="button" className="btn btn-delete"
                                                        style={{
                                                            backgroundColor: "#FF4B4B",
                                                            color: "white",
                                                            marginLeft: 1 + "rem"
                                                        }}
                                                        onClick={() => { this.handleDeleteCategory(data) }}>
                                                        Ngưng hoạt động
                                                    </button>
                                                </td >
                                            </tr >
                                        );
                                    }) : null
                            }
                        </tbody>
                    </table>
                </MainCard>
            </>
        )
    }
}

export default Category;