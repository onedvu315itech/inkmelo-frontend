import { Component } from "react";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from "lodash";
import { emitter } from "utils/emitter";
import productServices from "services/productServices";
import FileUpload from "components/FileUpload";

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
        }

        this.stateBookList = {
            listBook: [],
            book: {}
        }

        this.stateBook = {
            id: '',
            title: '',
            bookCoverImg: ''
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

    async componentDidMount() {
        this.setState({
            type: 'PAPER',
            status: 'ACTIVE'
        });
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
        let arrInputAudio = ['source', 'duration'];
        let inputPDF = 'source';
        let inputPaper = 'stock';
        if (this.state.type === 'AUDIO') {
            for (let i = 0; i < arrInputAudio.length; i++) {
                if (!this.state[arrInputAudio[i]]) {
                    isValid = false;
                    alert('Thông tin không được để trống: ' + arrInputAudio[i]);
                    break;
                }
            }
        }

        if (this.state.type === 'PAPER' && !this.state.stock) {
            isValid = false;
            alert('Thông tin không được để trống: ' + inputPaper);
        }

        if (this.state.type === 'PDF' && !this.state.source) {
            isValid = false;
            alert('Thông tin không được để trống: ' + inputPDF);
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
        if (id === "bookId")
            this.setState({
                bookId: this.stateBook.id,
                bookTitle: this.stateBook.title,
                bookCoverImg: this.stateBook.bookCoverImg
            });
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    getSource = (source) => {
        this.setState({ source: source });
    }

    handleOnClickBookTitle = (book) => {
        this.setState([
            this.stateBook.id = book.id,
            this.stateBook.title = book.title,
            this.stateBook.bookCoverImg = book.bookCoverImg
        ])
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
                                <div className="col-2">
                                    <label htmlFor="category-name" className="col-form-label">ID:</label>
                                    <input type="text" className="form-control" readOnly
                                        onChange={(event) => { this.handleOnChangeInput(event, "id") }}
                                        value={this.state.id || ''}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="publisher-name" className="col-form-label">Ảnh bìa:</label>
                                    {
                                        this.stateBook.bookCoverImg &&
                                        <img src={this.state.bookCoverImg} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                    }
                                </div>
                                <div className="form-group col-12">
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                        <Select
                                            value={this.stateBook.id || ''}
                                            onChange={(event) => this.handleOnChangeInput(event, "bookId")}
                                            style={{ display: "block", width: 473 + "px" }}
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
                                    {
                                        this.state.type !== 'PAPER' &&
                                        <div>
                                            <div className="col-12">
                                                <label htmlFor="category-name" className="col-form-label">Nguồn:</label>
                                                <input type="text" className="form-control" id="category-name"
                                                    style={{ width: 473 + "px", marginBottom: 10 + 'px' }} readOnly
                                                    value={this.state.source || ''}
                                                />
                                            </div>
                                            {
                                                this.state.type === 'AUDIO' &&
                                                <FileUpload
                                                    storageLocation="audio"
                                                    getFile={this.getSource}
                                                    onChange={(event) => { this.handleOnChangeInput(event, "source") }}
                                                />
                                            }
                                            {
                                                this.state.type === 'PDF' &&
                                                <FileUpload
                                                    storageLocation="pdf"
                                                    getFile={this.getSource}
                                                    onChange={(event) => { this.handleOnChangeInput(event, "source") }}
                                                />
                                            }
                                        </div>
                                    }
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
                                {
                                    this.state.type === 'AUDIO' &&
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Thời lượng</label>
                                        <input type="number" className="form-control" id="category-name"
                                            style={{ width: 473 + "px" }}
                                            onChange={(event) => { this.handleOnChangeInput(event, "duration") }}
                                            value={this.state.duration || ''}
                                        />
                                    </div>
                                }
                                {
                                    this.state.type === 'PAPER' &&
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Sản phẩm trong kho</label>
                                        <input type="number" className="form-control" id="category-name"
                                            style={{ width: 473 + "px" }}
                                            onChange={(event) => { this.handleOnChangeInput(event, "stock") }}
                                            value={this.state.stock || ''}
                                        />
                                    </div>
                                }
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