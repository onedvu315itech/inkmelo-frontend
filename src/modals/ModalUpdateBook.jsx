import { Component } from "react";
import { Box, Checkbox, Chip, MenuItem, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'
import FileUpload from "components/FileUpload";
import productServices from "services/productServices";
import { Stars } from "@mui/icons-material";

class ModalUpdateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            ISBN: '',
            publicationDecisionNumber: '',
            publicationRegistConfirmNum: '',
            depositCopy: '',
            author: '',
            description: '',
            bookCoverImg: '',
            bookCoverImgFixed: '',
            averageStar: '',
            totalRating: '',
            publisherFixed: '',
            publisher: '',
            publisherId: '',
            ratings: [],
            genres: [],
            genreIds: [],
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
            status: ''
        }

        this.statePublisherList = {
            listPublishers: []
        }

        this.stateGenreList = {
            listGenres: []
        }
    }

    async componentDidMount() {
        let book = this.props.currentBook;
        if (book && !_.isEmpty(book)) {
            this.setState({
                id: book.id,
                title: book.title,
                ISBN: book.ISBN,
                publicationDecisionNumber: book.publicationDecisionNumber,
                publicationRegistConfirmNum: book.publicationRegistConfirmNum,
                depositCopy: book.depositCopy,
                author: book.author,
                description: book.description,
                bookCoverImg: book.bookCoverImg,
                bookCoverImgFixed: book.bookCoverImg,
                averageStar: book.averageStar,
                totalRating: book.totalRating,
                publisherFixed: book.publisher.id,
                publisherId: book.publisher.id,
                publisher: book.publisher,
                genres: book.genres,
                genreIds: book.genres.map(genre => genre.id),
                createdAt: book.createdAt,
                lastUpdatedTime: book.lastUpdatedTime,
                lastChangedBy: book.lastChangedBy,
                status: book.status,
            });
        }

        let resOfPublisher = await productServices.getAllPublisher();
        if (resOfPublisher)
            this.setState([
                this.statePublisherList.listPublishers = resOfPublisher.data
            ]);

        let resOfGenre = await productServices.getAllGenre();
        if (resOfGenre)
            this.setState([
                this.stateGenreList.listGenres = resOfGenre.data
            ]);
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
        let arrInput = [
            'title', 'ISBN', 'publicationDecisionNumber', 'publicationRegistConfirmNum',
            'depositCopy', 'author', 'description', 'bookCoverImg', 'publisherId', 'genreIds'
        ];
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
        if (id === "bookCoverImg") {
            copyState[id] = this.getImage();
        }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    getImage = (image) => {
        this.setState({ bookCoverImg: image })
    }

    handlePublisherChange = (event) => {
        let publisherId = event.target.value;
        let selectedPublisher = this.statePublisherList.listPublishers.find(publisher => publisher.id === publisherId);
        this.setState({
            publisher: selectedPublisher,
            publisherId: publisherId
        });
    };

    handleGenresChange = (event) => {
        let genreIds = event.target.value;
        let selectedGenres = this.stateGenreList.listGenres.filter(genre => genreIds.includes(genre.id));
        this.setState({
            genres: selectedGenres,
            genreIds: genreIds
        });
    };

    handleSaveBook = () => {
        let isValid = this.checkValidInput();
        if (isValid)
            this.props.updateBook(this.state);
    }

    render() {
        let { open } = this.props;
        let {
            id, title, ISBN, author, publicationDecisionNumber, publicationRegistConfirmNum,
            depositCopy, description, bookCoverImg, publisherId, genres, status, publisherFixed,
            bookCoverImgFixed
        } = this.state;
        let { listGenres } = this.stateGenreList;
        let { listPublishers } = this.statePublisherList;
        return (
            <>
                <Modal
                    open={open}
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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết thông tin sách</h5>
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
                                        value={id}
                                    />
                                </div>
                                <div className="col-5">
                                    <label htmlFor="category-name" className="col-form-label">Mã sách:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "ISBN") }}
                                        value={ISBN}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="publisher-name" className="col-form-label">Ảnh bìa:</label>
                                    {
                                        bookCoverImgFixed === bookCoverImg &&
                                        <img src={bookCoverImgFixed} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                    }
                                    <FileUpload
                                        storageLocation="book-covers"
                                        getFile={this.getImage}
                                        onChange={(event) => { this.handleOnChangeInput(event, "bookCoverImg") }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "title") }}
                                        value={title}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Mô tả:</label>
                                <textarea className="form-control col-12" id="message-text"
                                    onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                    value={description}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Tác giả:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "author") }}
                                        value={author}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Thể loại:</label>
                                    <Select
                                        multiple
                                        value={genres.map((genre) => genre.id)}
                                        onChange={(event) => this.handleGenresChange(event)}
                                        style={{ display: "block" }}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value, key) => {
                                                    let selectedGenre = listGenres.find(genre => genre.id === value);
                                                    return selectedGenre ? (
                                                        <Chip key={key} label={selectedGenre.name}
                                                            style={{ marginRight: 5 + "px" }}
                                                        />
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    >
                                        {
                                            listGenres.map((genre, key) => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        value={genre.id}
                                                    >
                                                        <Checkbox checked={genres.some((selectedGenre) => selectedGenre.id === genre.id)} />
                                                        {genre.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Nhà xuất bản:</label>
                                    <Select
                                        value={publisherId}
                                        onChange={(event) => this.handlePublisherChange(event)}
                                        style={{ display: "block" }}
                                    >
                                        {
                                            listPublishers.map((publisher, key) => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        value={publisher.id}
                                                    >
                                                        {publisher.name}
                                                        {publisher.id === publisherFixed && <Stars color="info" />}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Quyết định số:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "publicationDecisionNumber") }}
                                        value={publicationDecisionNumber || ''}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Đăng ký số:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "publicationRegistConfirmNum") }}
                                        value={publicationRegistConfirmNum || ''}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Bản quyền:</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.handleOnChangeInput(event, "depositCopy") }}
                                        value={depositCopy || ''}
                                    />
                                </div>
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
                                    value={status}>
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
                                onClick={() => this.handleSaveBook()}
                            >Lưu thay đổi</button>
                            <button type="button" className="btn btn-secondary btn-cancel"
                                onClick={this.handleClose}>Đóng</button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    };
}

export default ModalUpdateBook;