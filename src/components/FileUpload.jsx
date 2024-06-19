import { Box } from '@mui/system'
import { storage } from 'api/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { Component } from 'react'

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            imgURL: ''
        }
    }

    handleUpload = () => {
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput?.files[0];
        console.log(file)
        if (!file) return;

        let storageRef = ref(storage, `${this.props.storageLocation}/${file.name}`);
        let uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (err) => {
                switch (err.code) {
                    case 'storage/unknown':
                        console.log(err.serverResponse);
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        this.setState({ imgURL: downloadURL })
                    })
            }
        )
    }

    render() {
        return (
            <>
                <Box>
                    {this.state.imgURL && <img src={this.state.imgURL} alt='uploaded file' height={100} />}
                    <div>
                        <input type='file' />
                        <button type="button" onClick={this.handleUpload}>Tải ảnh lên</button>
                    </div>
                </Box>

            </>
        )
    }
}

export default FileUpload;