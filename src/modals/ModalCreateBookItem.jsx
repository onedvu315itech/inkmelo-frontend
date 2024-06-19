import { Component } from "react";
import { Box, Modal } from "@mui/material";
import 'style/css/Category.css'
import _ from "lodash";
import { emitter } from "utils/emitter";

class ModalCreateBookItem extends Component {
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

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
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
            })
        })
    }


    componentDidMount() {
        let bookItem = this.props.bookItem
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
        let arrInput = ['type', 'source', 'bookId', 'duration', 'stock'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Thông tin không được để trống: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddBookItem = () => {
        let isValid = this.checkValidInput();
        if (isValid)
            this.props.createBookItem(this.state);
    }

    handleClose = () => this.props.toggle();
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
        console.log(this.state)
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
                                <div className="col-1">
                                    <label htmlFor="category-name" className="col-form-label">BookID:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "bookId") }}
                                        value={this.state.bookId == null ? '' : this.state.bookId}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "bookTitle") }}
                                        value={this.state.bookTitle}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Loại sách:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "type") }}
                                        value={this.state.type}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Thời lượng:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "duration") }}
                                        value={this.state.duration}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Kho:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "stock") }}
                                        value={this.state.stock}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Nguồn:</label>
                                <textarea className="form-control" id="message-text"
                                    style={{ width: 473 + "px" }}
                                    onChange={(event) => { this.handleOnChangeInput(event, "source") }}
                                    value={this.state.source}
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
                                <select id="category-status" className="form-control"
                                    onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                    value={this.state.status == null ? '' : this.state.status}>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
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
                                onClick={this.handleAddBookItem}
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

export default ModalCreateBookItem;