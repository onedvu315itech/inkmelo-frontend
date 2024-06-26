import axios from "api/axios";

//Category
const createCategory = (createData) => {
    return axios.post('/admin/api/v1/categories', createData);
}

const getAllCategory = () => {
    return axios.get('/admin/api/v1/categories');
}

const updateCategory = (updatedData) => {
    return axios.put('/admin/api/v1/categories', updatedData);
}

const deleteCategory = (deletedId) => {
    return axios.delete(`/admin/api/v1/categories/${deletedId}`);
}

//Genre
const getAllGenre = () => {
    return axios.get('/admin/api/v1/genres');
}

const createGenre = (createGenre) => {
    return axios.post('/admin/api/v1/genres', createGenre);
}

const updateGenre = (updatedData) => {
    return axios.put('/admin/api/v1/genres', updatedData);
}
const deleteGenre = (deletedId) => {
    return axios.delete(`/admin/api/v1/genres/${deletedId}`);
}

//Publisher
const getAllPublisher = () => {
    return axios.get('/admin/api/v1/publishers');
}
const createPublisher = (createPublisher) => {
    return axios.post('/admin/api/v1/publishers', createPublisher);
}

const updatePublisher = (updatedData) => {
    return axios.put('/admin/api/v1/publishers', updatedData);
}
const deletePublisher = (deletedId) => {
    return axios.delete(`/admin/api/v1/publishers/${deletedId}`);
}

//Book Item
const getAllBookItem = () => {
    return axios.get('/admin/api/v1/book-items');
}

const updateBookItem = (updatedData) => {
    return axios.put('/admin/api/v1/book-items', updatedData)
}

const createBookItem = (createBookItem) => {
    return axios.post('/admin/api/v1/book-items', createBookItem);
}

const deleteBookItem = (deletedId) => {
    return axios.delete(`/admin/api/v1/book-items/${deletedId}`)
}

//Book
const getAllBook = () => {
    return axios.get('/admin/api/v1/books');
}

const updateBook = (updatedData) => {
    return axios.put('/admin/api/v1/books', updatedData)
}

const createBook = (createBook) => {
    return axios.post('/admin/api/v1/books', createBook);
}

const deleteBook = (deletedId) => {
    return axios.delete(`/admin/api/v1/books/${deletedId}`)
}

//Book Package
const getAllBookPackage = () => {
    return axios.get('/admin/api/v1/book-packages');
}

const updateBookPackage = (updatedData) => {
    return axios.put('/admin/api/v1/book-packages', updatedData)
}

const createBookPackage = (createBook) => {
    return axios.post('/admin/api/v1/book-packages', createBook);
}

const deleteBookPackage = (deletedId) => {
    return axios.delete(`/admin/api/v1/book-packages/${deletedId}`)
}
export default {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getAllGenre,
    createGenre,
    updateGenre,
    deleteGenre,
    getAllPublisher,
    createPublisher,
    updatePublisher,
    deletePublisher,
    getAllBookItem,
    updateBookItem,
    createBookItem,
    deleteBookItem,
    getAllBook,
    createBook,
    updateBook,
    deleteBook,
    getAllBookPackage,
    createBookPackage,
    updateBookPackage,
    deleteBookPackage,
};  