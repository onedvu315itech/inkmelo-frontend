import { Component } from "react";
import { Box, Modal, duration } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'


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
    }

    componentDidMount() {
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
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

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
                                        value={this.state.id == null ? '' : this.state.id}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <div className="col-1">
                                        <label htmlFor="category-name" className="col-form-label">BookID:</label>
                                        <input type="text" className="form-control" readOnly
                                            onChange={(event) => { this.handleOnChangeInput(event, "id") }}
                                            value={this.state.bookId == null ? '' : this.state.bookId}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                        <input type="text" className="form-control" id="category-name"
                                            style={{ width: 473 + "px" }}
                                            onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                            value={this.state.bookTitle == null ? '' : this.state.bookTitle}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Nguồn:</label>
                                        <input type="text" className="form-control" id="category-name"
                                            style={{ width: 473 + "px" }}
                                            onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                            value={this.state.source == null ? '' : this.state.source}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Loại</label>
                                    <textarea className="form-control" id="message-text"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                        value={this.state.type == null ? '' : this.state.type}
                                    ></textarea>
                                </div>
                                <div className="form-group date">
                                    <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                    <input type="text" className="form-control" id="category-createdDate" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "createdAt") }}
                                        value={this.state.createdAt == null ? '' : this.state.createdAt} />
                                    <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastUpdatedTime") }}
                                        value={this.state.lastUpdatedTime == null ? '' : this.state.lastUpdatedTime} />
                                </div>
                                <div className="form-group status-person">
                                    <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                    <select id="category-status" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                        value={this.state.status == null ? '' : this.state.status}>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="INACTIVE">INACTIVE</option>
                                    </select>
                                    <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(ev1ent, "lastChangedBy") }}
                                        value={this.state.lastChangedBy == null ? '' : this.state.lastChangedBy} />
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