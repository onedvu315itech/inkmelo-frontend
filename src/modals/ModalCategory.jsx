import React, { Component } from 'react'
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';


class ModalCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            description: '',
            lastUpadatedTime: '',
            lastChangeBy: '',
            status: '',
            isOpened: '',


        }
    }

    componentDidMount() {

    }

    toggle = () => {

    }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    handleClose = () => this.setState({ isOpened: false });

    render() {
        return (
            <>
                <Modal
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={this.style}>
                        sdadas
                    </Box>
                </Modal>
            </>
        )
    }
}

export default ModalCategory;



