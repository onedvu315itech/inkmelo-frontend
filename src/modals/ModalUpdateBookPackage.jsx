import { Component } from "react";
import { Box, Checkbox, Chip, MenuItem, Modal, Select } from "@mui/material";
import 'style/css/Category.css'
import _ from 'lodash'
import productServices from "services/productServices";
import { Stars } from "@mui/icons-material";

class ModalUpdateBookPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            price: '',
            modeId: '',
            modeIdFixed: '',
            stock: '',
            book: {},
            bookId: '',
            bookIdFixed: '',
            bookCoverImg: '',
            publisher: {},
            ratings: [],
            genres: [],
            status: '',
            items: [],
            itemIds: [],
            category: '',
            categoryId: '',
            categoryIdFixed: '',
            createdAt: '',
            lastUpdatedTime: '',
            lastChangedBy: '',
        };

        this.stateBookList = { listBooks: [] };
        this.stateModeId = { listModeIds: [] };
        this.stateItemList = { listItems: [] };
        this.stateCategoryList = { listCategories: [] };
    }

    async componentDidMount() {
        let bookPackage = this.props.currentBookPackage
        if (bookPackage && !_.isEmpty(bookPackage)) {
            this.setState({
                id: bookPackage.id,
                title: bookPackage.title,
                description: bookPackage.description,
                price: bookPackage.price,
                modeId: bookPackage.modeId,
                modeIdFixed: bookPackage.modeId,
                stock: bookPackage.stock,
                book: bookPackage.book,
                bookId: bookPackage.book.id,
                bookIdFixed: bookPackage.book.id,
                bookCoverImg: bookPackage.book.bookCoverImg,
                publisher: bookPackage.book.publisher,
                ratings: bookPackage.ratings,
                genres: bookPackage.book.genres,
                status: bookPackage.status,
                items: bookPackage.items,
                itemIds: bookPackage.items.map(item => item.id),
                category: bookPackage.category,
                categoryId: bookPackage.category.id,
                categoryIdFixed: bookPackage.category.id,
                createdAt: bookPackage.createdAt,
                lastUpdatedTime: bookPackage.lastUpdatedTime,
                lastChangedBy: bookPackage.lastChangedBy,
            });
        }

        let resOfBook = await productServices.getAllBook();
        if (resOfBook) this.setState([this.stateBookList.listBooks = resOfBook.data]);

        let resOfBookItem = await productServices.getAllBookItem();
        if (resOfBookItem) this.setState([this.stateItemList.listItems = resOfBookItem.data]);

        let resOfModeId = await productServices.getAllModeId();
        if (resOfModeId) this.setState([this.stateModeId.listModeIds = resOfModeId.data]);

        let resOfCategory = await productServices.getAllCategory();
        if (resOfCategory) this.setState([this.stateCategoryList.listCategories = resOfCategory.data]);
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

    styleBook = {
        position: 'relatives',
        border: 2 + 'px, solid #09b3be',
        width: 473,
        marginTop: 10 + 'px',
        padding: 20 + 'px ' + 10 + 'px',
        borderRadius: 10 + 'px'
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            'title', 'description', 'price', 'modeId',
            'itemIds', 'categoryId', 'bookId',
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
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleBookChange = (event) => {
        let bookId = event.target.value;
        let selectedBook = this.stateBookList.listBooks.find(book => book.id === bookId);
        this.setState({
            book: selectedBook,
            bookId: bookId,
            bookCoverImg: selectedBook.bookCoverImg,
            publisher: selectedBook.publisher,
            genres: selectedBook.genres
        });
    };

    handleModeIdChange = (event) => {
        let modeId = event.target.value;
        this.setState({
            modeId: modeId
        });
    };

    handleItemsChange = (event) => {
        let itemIds = event.target.value;
        let selectedItems = this.stateItemList.listItems.filter(item => itemIds.includes(item.id));
        this.setState({
            items: selectedItems,
            itemIds: itemIds
        });
    };

    handleCategoryChange = (event) => {
        let categoryId = event.target.value;
        this.setState({
            categoryId: categoryId
        });
    };

    handleSaveBookPackage = () => {
        let isValid = this.checkValidInput();
        if (isValid)
            this.props.updateBookPackage(this.state);
    }

    render() {
        let { open } = this.props;
        let {
            id, title, modeId, price, stock, book, ratings, genres, items, modeIdFixed,
            status, bookId, bookCoverImg, description, categoryId, bookIdFixed,
            publisher, createdAt, lastUpdatedTime, lastChangedBy, categoryIdFixed
        } = this.state;
        let { listBooks } = this.stateBookList;
        let { listModeIds } = this.stateModeId;
        let { listItems } = this.stateItemList;
        let { listCategories } = this.stateCategoryList;
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
                            <h5 className="modal-title" style={{ display: "inline-block" }}>Chi tiết gói sách</h5>
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
                                        value={id || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Tên gói:</label>
                                    <input type="text" className="form-control" id="category-name"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "title") }}
                                        value={title || ''}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="message-text" className="col-form-label">Mô tả:</label>
                                    <textarea className="form-control" id="message-text"
                                        style={{ width: 473 + "px" }}
                                        onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                        value={description || ''}
                                    ></textarea>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Dạng sản phẩm:</label>
                                    <Select
                                        value={modeId || ''}
                                        onChange={(event) => this.handleModeIdChange(event)}
                                        style={{ display: "block", width: 473 + "px" }}
                                    >
                                        {
                                            listModeIds.map((mode, key) => {
                                                return (
                                                    <MenuItem key={key} value={mode.id}>
                                                        {mode.description}
                                                        {mode.id === modeIdFixed && <Stars color="info" />}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                    <Select
                                        multiple
                                        value={items.map((item) => item.id)}
                                        onChange={(event) => this.handleItemsChange(event)}
                                        style={{ display: "block", marginTop: 20 + 'px', width: 473 + 'px' }}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value, key) => {
                                                    let selectedItem = listItems.find(item => item.id === value);
                                                    return selectedItem ? (
                                                        <Chip key={key} label={selectedItem.type}
                                                            style={{ marginRight: 5 + "px" }}
                                                        />
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    >
                                        {
                                            listItems.map((item, key) => {
                                                if (item.bookId === bookId)
                                                    return (
                                                        <MenuItem
                                                            key={key}
                                                            value={item.id}
                                                        >
                                                            <Checkbox checked={items.some((selectedItem) => selectedItem.id === item.id)} />
                                                            {item.type} - {item.bookTitle}
                                                        </MenuItem>
                                                    )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Loại sản phẩm:</label>
                                    <Select
                                        value={categoryId || ''}
                                        onChange={(event) => this.handleCategoryChange(event)}
                                        style={{ display: "block", width: 473 + "px" }}
                                    >
                                        {
                                            listCategories.map((category, key) => {
                                                return (
                                                    <MenuItem key={key} value={category.id}>
                                                        {category.name}
                                                        {category.id === categoryIdFixed && <Stars color="info" />}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className="form-group col-12">
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Giá sách:</label>
                                    <div className="col-12">
                                        <div className="col-4" style={{ display: "inline-block" }}>
                                            <input type="number" className="form-control" id="category-name"
                                                onChange={(event) => { this.handleOnChangeInput(event, "price") }}
                                                value={price || ''}
                                            />
                                        </div>
                                        <div className="col-2" style={{ display: "inline-block", marginLeft: 5 + "px" }}>
                                            <input type="text" className="form-control"
                                                value={'VND'} readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="category-name" className="col-form-label">Hàng trong kho (bản cứng):</label>
                                    <div className="col-2">
                                        <input type="text" className="form-control" id="category-name"
                                            readOnly value={stock || 0}
                                        />
                                    </div>
                                </div>
                                <Box
                                    style={this.styleBook}
                                >
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Sách:</label>
                                        <Select
                                            value={book.id || ''}
                                            onChange={(event) => this.handleBookChange(event)}
                                            style={{ display: "block" }}
                                        >
                                            {
                                                listBooks.map((book, key) => {
                                                    return (
                                                        <MenuItem key={key} value={book.id}>
                                                            {book.title}
                                                            {book.id === bookIdFixed && <Stars color="info" />}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    {
                                        bookCoverImg &&
                                        <div>
                                            <label htmlFor="publisher-name" className="col-form-label">Ảnh bìa:</label>
                                            <img src={bookCoverImg} alt="Uploaded File" height={100} style={{ display: "block" }} />
                                        </div>
                                    }
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Tác giả:</label>
                                        <input type="text" className="form-control" id="category-createdDate" readOnly
                                            value={book.author || ''} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label">Nhà xuất bản:</label>
                                        <input type="text" className="form-control" id="category-createdDate" readOnly
                                            value={publisher.name || ''} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="category-name" className="col-form-label"
                                            style={{ display: "block" }}
                                        >Thể loại:</label>
                                        {
                                            genres.map((genre, key) => {
                                                return (
                                                    <Chip key={key} label={genre.name}
                                                        style={{ marginRight: 5 + "px" }}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </Box>
                            </div>
                            <div className="form-group date">
                                <label htmlFor="category-name" className="col-form-label">Ngày tạo:</label>
                                <input type="text" className="form-control" id="category-createdDate" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "createdAt") }}
                                    value={createdAt || ''} />
                                <label htmlFor="category-name" className="col-form-label">Cập nhật mới:</label>
                                <input type="text" className="form-control" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastUpdatedTime") }}
                                    value={lastUpdatedTime || ''} />
                            </div>
                            <div className="form-group status-person">
                                <label htmlFor="category-name" className="col-form-label">Trạng thái</label>
                                <select id="category-status" className="form-control"
                                    onChange={(event) => { this.handleOnChangeInput(event, "status") }}
                                    value={status || ''}>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                                <label htmlFor="category-name" className="col-form-label">Người cập nhật:</label>
                                <input type="text" className="form-control" readOnly
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastChangedBy") }}
                                    value={lastChangedBy || ''} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-update"
                                style={{
                                    backgroundColor: "rgb(220, 120, 0)",
                                    color: "white"
                                }}
                                onClick={() => this.handleSaveBookPackage()}
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

export default ModalUpdateBookPackage;