import { Component } from "react";
import { Box, Chip, Input, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'
import productServices from "services/productServices";


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
            status: '',
            publisherName: ''
        }

        this.statePublisherList = {
            listPublishers: []
        }

        this.stateGenreList = {
            listGenres: []
        }
    }

    async componentDidMount() {
        let book = this.props.book;
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
                publisherName: book.publisher.name
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

    handleClose = () => this.props.toggle();

    render() {
        let { open } = this.props;
        let {
            id, title, ISBN, author, publicationDecisionNumber, publicationRegistConfirmNum,
            depositCopy, description, bookCoverImg, publisherId, genres, status, publisherName,
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

                                        value={id}
                                    />
                                </div>
                                <div className="col-5">
                                    <label htmlFor="category-name" className="col-form-label">Mã sách:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={ISBN}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="publisher-name" className="col-form-label">Ảnh bìa:</label>
                                    {
                                        bookCoverImgFixed === bookCoverImg &&
                                        <img src={bookCoverImgFixed} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                    }
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên sách:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={title}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Mô tả:</label>
                                <textarea className="form-control col-12" id="message-text"
                                    readOnly
                                    value={description}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Tác giả:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={author}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Thể loại:</label>
                                    <Select
                                        multiple
                                        value={genres.map((genre) => genre.id)}
                                        readOnly
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
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Nhà xuất bản:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={publisherName} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Số quyết định xuất bản:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={publicationDecisionNumber || ''}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Số xác nhận đăng ký xuất bản:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={publicationRegistConfirmNum || ''}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message-text" className="col-form-label">Nộp lưu chiểu:</label>
                                    <input type="text" className="form-control"
                                        readOnly
                                        value={depositCopy || ''}
                                    />
                                </div>
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
                                <input type="text" className="form-control" id="category-status" readOnly
                                    value={status || ''} />
                                <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                <input type="text" className="form-control" readOnly

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

export default ModalUpdateBook;