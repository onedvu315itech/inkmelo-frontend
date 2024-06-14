import { Component } from "react";
import { Box, Modal } from "@mui/material";
import 'style/css/Category.css'
import productServices from "services/productServices";
import _ from "lodash";

class ModalCreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
            status: '',
            isOpened: false,
            data: [],
            totalQuantity: 0,
        }
    }

    componentDidMount() {
        let category = this.props.categoryInfor
        if (category && !_.isEmpty(category)) {
            this.setState({
                id: category.id,
                name: category.name,
                description: category.description,
                createdAt: category.createdAt,
                lastUpdatedTime: category.lastUpdatedTime,
                lastChangedBy: category.lastChangedBy,
                status: category.status
            })
        }
    }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 10,
        p: 4,
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['name', 'description'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Thông tin không được để trống: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    // generateAutoId = async (id) => {
    //     let res = await productServices.getAllCategory();
    //     console.log(res.data.length)

    //     id = res.data.length + 1;
    //     return id;
    // }

    // setAutoData = () => {
    //     this.setState({
    //         id: this.generateAutoId(id)
    //     })
    // }

    handleAddCategory = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            console.log('date modal ', this.state)
            this.props.createCategory(this.state)
        }
    }

    handleClose = () => this.props.toggle();
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    render() {
        return (
            <>
                <Modal
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={this.style}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Nhập thông tin mới</h5>
                            <span className="justify-content-end inline-block">
                                <button type="button" className="btn-close"
                                    onClick={this.handleClose}></button>
                            </span>
                        </div>
                        <div className="modal-body pop-up-body">
                            <div className="form-group col-12">
                                <div className="col-1">
                                    <label htmlFor="category-name" className="col-form-label">ID:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "id") }}
                                        value={this.state.id}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Mô tả:</label>
                                <textarea className="form-control" id="message-text"
                                    style={{ width: 473 + "px" }}
                                    onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                            <div className="form-group date">
                                <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                <input type="text" className="form-control" id="category-createdDate" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "createdAt") }}
                                    value={this.state.createdAt} />
                                <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                <input type="text" className="form-control" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastUpdatedTime") }}
                                    value={this.state.lastUpdatedTime} />
                            </div>
                            <div className="form-group status-person">
                                <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                <input type="text" className="form-control" id="category-status"
                                    onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                    value={this.state.status} list="status" />
                                <datalist id="status">
                                    <option value="ACTIVE" />
                                    <option value="INACTIVE" />
                                </datalist>
                                <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                <input type="text" className="form-control" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastChangedBy") }}
                                    value={this.state.lastChangedBy} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-update"
                                style={{
                                    backgroundColor: "rgb(220, 120, 0)",
                                    color: "white"
                                }}
                                onClick={this.handleAddCategory}
                            // onClick={this.generateAutoId}
                            >Thêm mới</button>
                            <button type="button" className="btn btn-secondary btn-cancel"
                                onClick={this.handleClose}>Đóng</button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    }
}

export default ModalCreateCategory;



