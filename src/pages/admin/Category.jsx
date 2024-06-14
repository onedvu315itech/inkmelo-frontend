// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import productService from "services/productServices";
import { Component, useEffect, useState } from "react";
import ModalCategory from 'modals/ModalCategory';
import ModalUpdateCategory from 'modals/ModalUpdateCategory';


// ==============================|| SAMPLE PAGE ||============================== //

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            isOpenedModalUpdateCategory: false,
            categoryUpdate: {},
        }
    }

    readStatus = (status) => {
        if (!status) return 'Không hoạt động';
        else return status;
    }

    toggleCategoryModal = () => {
        this.setState({
            isOpenedModalUpdateCategory: !this.state.isOpenedModalUpdateCategory
        });
    }

    componentDidMount() {
        productService.getAllCategory().then((res) => {
            this.setState({ listCategory: res.data })
        });
    }

    // For add new category
    handleAddNewCatergory = () => {
        alert('Click me')
    }

    //For update category
    handleUpdateCategory = (category) => {
        this.setState({
            isOpenedModalUpdateCategory: true,
            categoryUpdate: category
        });
    }

    // checking
    doUpdateCategory = async (category) => {
        try {
            let res = await productService.updateCategory(category);
            console.log('Res from updated category: ', res);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <div className='mx-1'>
                    {/* <ModalCategory /> */}
                    <button className='btn btn-primary px'
                        onClick={this.handleAddNewCatergory}>
                        Add
                    </button>
                    {
                        this.state.isOpenedModalUpdateCategory &&
                        <ModalUpdateCategory
                            open={this.state.isOpenedModalUpdateCategory}
                            toggle={this.toggleCategoryModal}
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
                            this.state.listCategory && this.state.listCategory.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>
                                            {this.readStatus(data.status)}
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-primary"
                                                data-bs-toggle="modal" data-bs-target="#readCategory"
                                                onClick={() => { this.handleUpdateCategory(data) }}>
                                                Cập nhật
                                            </button>
                                            <button type="button" className="btn btn-delete"
                                                style={{
                                                    backgroundColor: "#FF4B4B",
                                                    color: "white",
                                                    marginLeft: 1 + "rem"
                                                }}>Xóa</button>
                                        </td >
                                    </tr >
                                );
                            })
                        }
                    </tbody >
                </table >
            </>
        )
    }
}

export default Category;