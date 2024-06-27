import { Component } from "react";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'
import productServices from "services/productServices";

class ModalUpdateBookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            bookId: '',
            bookTitle: '',
            bookCoverImg: '',
            type: '',
            source: '',
            duration: '',
            stock: '',
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
            status: '',
            isOpened: false,
        }

        this.stateBookList = {
            listBook: [],
            book: {}
        }

        this.stateBook = {
            id: '',
            title: ''
        }
    }

    async componentDidMount() {
        let bookItem = this.props.currentBookItem
        if (bookItem && !_.isEmpty(bookItem)) {
            this.setState({
                id: bookItem.id,
                bookId: bookItem.bookId,
                bookTitle: bookItem.bookTitle,
                bookCoverImg: bookItem.bookCoverImg,
                type: bookItem.type,
                source: bookItem.source,
                duration: bookItem.duration,
                stock: bookItem.stock,
                createdAt: bookItem.createdAt,
                lastUpdatedTime: bookItem.lastUpdatedTime,
                lastChangedBy: bookItem.lastChangedBy,
                status: bookItem.status
            })
            this.setState([
                this.stateBook.id = bookItem.bookId,
                this.stateBook.title = bookItem.bookTitle
            ]);
        }


        let res = await productServices.getAllBook();
        if (res)
            this.setState([this.stateBookList.listBook = res.data]);
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
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['source', 'status'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Thông tin không được để trống: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleClose = () => this.props.toggle();
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        if (id === "bookId")
            this.setState({
                bookId: this.stateBook.id,
                bookTitle: this.stateBook.title,
            })
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleOnClickBookTitle = (book) => {
        this.setState([
            this.stateBook.id = book.id,
            this.stateBook.title = book.title,
        ])
    }

    handleSaveBookItem = () => {
        let isValid = this.checkValidInput();
        if (isValid)
            this.props.updateBookItem(this.state);
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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết thể loại sản phẩm</h5>
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
                                        value={this.state.id || ''}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                        <Select
                                            value={this.stateBook.id}
                                            onChange={(event) => this.handleOnChangeInput(event, "bookId")}
                                            style={{ display: "block" }}
                                        >
                                            {
                                                this.stateBookList.listBook.map((item, key) => {
                                                    return (
                                                        <MenuItem
                                                            key={key}
                                                            value={item.id}
                                                            onClick={() => this.handleOnClickBookTitle(item)}
                                                        >
                                                            {item.title}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Nguồn:</label>
                                        <input type="text" className="form-control" id="category-name"
                                            style={{ width: 473 + "px" }}
                                            onChange={(event) => { this.handleOnChangeInput(event, "source") }}
                                            value={this.state.source || ''}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Loại</label>
                                    <select id="category-status" className="form-control" style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "type") }}
                                        value={this.state.type || ''}>
                                        <option value="AUDIO">AUDIO</option>
                                        <option value="PDF">PDF</option>
                                        <option value="PAPER">PAPER</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Thời lượng</label>
                                    <input type="number" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "duration") }}
                                        value={this.state.duration || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Sản phẩm trong kho</label>
                                    <input type="number" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "stock") }}
                                        value={this.state.stock || ''}
                                    />
                                </div>
                                <div className="form-group date">
                                    <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                    <input type="text" className="form-control" id="category-createdDate" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "createdAt") }}
                                        value={this.state.createdAt || ''} />
                                    <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastUpdatedTime") }}
                                        value={this.state.lastUpdatedTime || ''} />
                                </div>
                                <div className="form-group status-person">
                                    <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                    <select id="category-status" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                        value={this.state.status || ''}>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="INACTIVE">INACTIVE</option>
                                    </select>
                                    <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastChangedBy") }}
                                        value={this.state.lastChangedBy || ''} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-update"
                                    style={{
                                        backgroundColor: "rgb(220, 120, 0)",
                                        color: "white"
                                    }}
                                    onClick={() => { this.handleSaveBookItem() }}
                                >Lưu thay đổi</button>
                                <button type="button" className="btn btn-secondary btn-cancel"
                                    onClick={this.handleClose}>Đóng</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    };
}

export default ModalUpdateBookItem;