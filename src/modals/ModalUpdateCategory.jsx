import { Component } from "react";
import { Box, Modal, Typography, Input, TextField } from "@mui/material";

class ModalUpdateCategory extends Component {
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
            isOpened: '',
        }
    }

    componentDidMount() {

    }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 10,
        p: 4,
    };

    handleClose = () => this.setState({ isOpened: false });

    render() {
        return (
            <>
                <Modal
                    open={true}
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
                        <div className="modal-title">
                            <h5 className="modal-title" id="readCategoryLongTitle">Chi tiết loại sản phẩm</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <label>ID:</label>
                        <TextField
                            id="id"
                            disabled
                        />
                    </Box>
                </Modal>
            </>
        )
    };
}

export default ModalUpdateCategory;