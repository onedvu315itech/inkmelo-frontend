import { Component } from "react";
import { Box, Modal } from "@mui/material";
import 'style/css/Category.css';
import _ from 'lodash';
import FileUpload from "components/FileUpload";

class ModalDisplayPublisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            logoImg: '',
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
            status: '',
            isRenderedImage: false
        }
    }

    componentDidMount() {
        let publisher = this.props.publisher
        if (publisher && !_.isEmpty(publisher)) {
            this.setState({
                id: publisher.id,
                name: publisher.name,
                description: publisher.description,
                logoImg: publisher.logoImg,
                createdAt: publisher.createdAt,
                lastUpdatedTime: publisher.lastUpdatedTime,
                lastChangedBy: publisher.lastChangedBy,
                status: publisher.status
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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết thông tin nhà xuất bản</h5>
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
                                        value={this.state.id || ''}
                                    />
                                </div>
                                {
                                    this.state.logoImg &&
                                    <>
                                        <label htmlFor="publisher-name" className="col-form-label">Logo:</label>
                                        <img src={this.state.logoImg} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                    </>

                                }
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        readOnly
                                        value={this.state.name || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Mô tả:</label>
                                <textarea className="form-control" id="message-text"
                                    style={{ width: 473 + "px" }}
                                    readOnly
                                    value={this.state.description || ''}
                                ></textarea>
                            </div>
                            <div className="form-group date">
                                <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                <input type="text" className="form-control" id="category-createdDate" readOnly
                                    value={this.state.createdAt || ''} />
                                <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                <input type="text" className="form-control" readOnly
                                    value={this.state.lastUpdatedTime || ''} />
                            </div>
                            <div className="form-group status-person">
                                <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                <input type="text" className="form-control" readOnly id="category-status"
                                    value={this.state.status || ''} />
                                <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                <input type="text" className="form-control" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastChangedBy") }}
                                    value={this.state.lastChangedBy || ''} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-cancel"
                                onClick={this.handleClose}>Đóng</button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    };
}

export default ModalDisplayPublisher;