import { Component } from "react";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'
import productServices from "services/productServices";
import { Stars } from "@mui/icons-material";

class ModalDisplayBookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            bookId: '',
            bookIdFixed: '',
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
    }

    async componentDidMount() {
        let bookItem = this.props.bookItem
        if (bookItem && !_.isEmpty(bookItem)) {
            this.setState({
                id: bookItem.id,
                bookId: bookItem.bookId,
                bookIdFixed: bookItem.bookId,
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
            });
            this.setState({
                stateBook: {
                    id: bookItem.bookId,
                    title: bookItem.bookTitle,
                    bookCoverImg: bookItem.bookCoverImg,
                }
            });
        }

        let res = await productServices.getAllBook();
        if (res) {
            this.setState({
                stateBookList: {
                    listBook: res.data
                }
            });
        }
        console.log(bookItem)
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

    handleClose = () => this.props.toggle();

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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết thông tin loại sách</h5>
                            <span className="justify-content-end inline-block">
                                <button type="button" className="btn-close" onClick={this.handleClose}></button>
                            </span>
                        </div>
                        <div className="modal-body pop-up-body">
                            <div className="form-group col-12">
                                <div className="col-2">
                                    <label htmlFor="category-name" className="col-form-label">ID:</label>
                                    <input type="text" className="form-control" readOnly value={this.state.id || ''} />
                                </div>
                                {this.state.bookCoverImg &&
                                    <div>
                                        <label htmlFor="publisher-name" className="col-form-label">Ảnh bìa:</label>
                                        <img src={this.state.bookCoverImg} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                    </div>
                                }
                                <div className="form-group col-12">
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Tên sách:</label>

                                        <input type="text" className="form-control" readOnly value={this.state.bookTitle || ''} />

                                    </div>
                                    {this.state.type !== 'PAPER' && (
                                        <div>
                                            <div className="col-12">
                                                <label htmlFor="category-name" className="col-form-label">Nguồn:</label>
                                                <input type="text" className="form-control" id="category-name" readOnly value={this.state.source || ''} style={{ width: 473 + "px", marginBottom: 10 + 'px' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Loại</label>
                                    <select id="category-status" className="form-control" style={{ width: 473 + "px" }} readOnly value={this.state.type || ''}>
                                        <option value="AUDIO">AUDIO</option>
                                        <option value="PDF">PDF</option>
                                        <option value="PAPER">PAPER</option>
                                    </select>
                                </div>
                                {this.state.type === 'AUDIO' && (
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Thời lượng</label>
                                        <input type="number" className="form-control" id="category-name" readOnly value={this.state.duration || ''} style={{ width: 473 + "px" }} />
                                    </div>
                                )}
                                {this.state.type === 'PAPER' && (
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Sản phẩm trong kho</label>
                                        <input type="number" className="form-control" id="category-name" readOnly value={this.state.stock || ''} style={{ width: 473 + "px" }} />
                                    </div>
                                )}
                                <div className="form-group date">
                                    <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                    <input type="text" className="form-control" id="category-createdDate" readOnly value={this.state.createdAt || ''} />
                                    <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                    <input type="text" className="form-control" readOnly value={this.state.lastUpdatedTime || ''} />
                                </div>
                                <div className="form-group status-person">
                                    <label htmlFor="category-status" className="col-form-label">Trạng thái</label>
                                    <input type="text" className="form-control" id="category-status" readOnly value={this.state.status || ''} />
                                    <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                    <input type="text" className="form-control" readOnly value={this.state.lastChangedBy || ''} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-cancel" onClick={this.handleClose}>Đóng</button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    }
}

export default ModalDisplayBookItem;
