import { Component } from "react";
import { Box, Modal } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            fullname: '',
            email: '',
            role: '',
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
            status: ''
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

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                lastUpdatedTime: user.lastUpdatedTime,
                lastChangedBy: user.lastChangedBy,
                status: user.status
            })
        }
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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết thông tin người dùng</h5>
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
                                        defaultValue={this.state.id || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Họ và tên</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        readOnly
                                        defaultValue={this.state.fullname || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tài Khoản</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        readOnly
                                        defaultValue={this.state.username || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Email</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        readOnly
                                        defaultValue={this.state.email || ''}
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="user-role" className="col-form-label">Vị trí:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="user-role"
                                        readOnly
                                        defaultValue={this.state.role || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-group date">
                                <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                <input type="text" className="form-control" id="category-createdDate" readOnly
                                    defaultValue={this.state.createdAt || ''} />
                                <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                <input type="text" className="form-control" readOnly
                                    defaultValue={this.state.lastUpdatedTime || ''} />
                            </div>
                            <div className="form-group status-person">
                                <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                <input type="text" className="form-control" id="category-status" readOnly
                                    defaultValue={this.state.status || ''} />
                                <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                <input type="text" className="form-control" readOnly
                                    defaultValue={this.state.lastChangedBy || ''} />
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

export default ModalUser;