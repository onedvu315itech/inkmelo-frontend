import axios from "api/axios";
import authHeader from "./authHeaderServices";

//Category
const createCategory = (createData) => {
    return axios.post('/admin/api/v1/categories', createData, { headers: authHeader() });
}

const getAllCategory = () => {
    return axios.get('/admin/api/v1/categories', { headers: authHeader() });
}

const updateCategory = (updatedData) => {
    return axios.put('/admin/api/v1/categories', updatedData, { headers: authHeader() });
}

const deleteCategory = (deletedId) => {
    return axios.delete(`/admin/api/v1/categories/${deletedId}`, { headers: authHeader() });
}

//Genre
const getAllGenre = () => {
    return axios.get('/admin/api/v1/genres', { headers: authHeader() });
}

const createGenre = (createGenre) => {
    return axios.post('/admin/api/v1/genres', createGenre, { headers: authHeader() });
}

const updateGenre = (updatedData) => {
    return axios.put('/admin/api/v1/genres', updatedData, { headers: authHeader() });
}
const deleteGenre = (deletedId) => {
    return axios.delete(`/admin/api/v1/genres/${deletedId}`, { headers: authHeader() });
}

//Publisher
const getAllPublisher = () => {
    return axios.get('/admin/api/v1/publishers', { headers: authHeader() });
}
const createPublisher = (createPublisher) => {
    return axios.post('/admin/api/v1/publishers', createPublisher, { headers: authHeader() });
}

const updatePublisher = (updatedData) => {
    return axios.put('/admin/api/v1/publishers', updatedData, { headers: authHeader() });
}
const deletePublisher = (deletedId) => {
    return axios.delete(`/admin/api/v1/publishers/${deletedId}`, { headers: authHeader() });
}

//Book Item
const getAllBookItem = () => {
    return axios.get('/admin/api/v1/book-items', { headers: authHeader() });
}

const updateBookItem = (updatedData) => {
    return axios.put('/admin/api/v1/book-items', updatedData, { headers: authHeader() })
}

const createBookItem = (createBookItem) => {
    return axios.post('/admin/api/v1/book-items', createBookItem, { headers: authHeader() });
}

const deleteBookItem = (deletedId) => {
    return axios.delete(`/admin/api/v1/book-items/${deletedId}`, { headers: authHeader() })
}

//Book
const getAllBook = () => {
    return axios.get('/admin/api/v1/books', { headers: authHeader() });
}

const updateBook = (updatedData) => {
    return axios.put('/admin/api/v1/books', updatedData, { headers: authHeader() })
}

const createBook = (createBook) => {
    return axios.post('/admin/api/v1/books', createBook, { headers: authHeader() });
}

const deleteBook = (deletedId) => {
    return axios.delete(`/admin/api/v1/books/${deletedId}`, { headers: authHeader() })
}

//Book Package
const getAllBookPackage = () => {
    return axios.get('/admin/api/v1/book-packages', { headers: authHeader() });
}

const updateBookPackage = (updatedData) => {
    return axios.put('/admin/api/v1/book-packages', updatedData, { headers: authHeader() })
}

const createBookPackage = (createBook) => {
    return axios.post('/admin/api/v1/book-packages', createBook, { headers: authHeader() });
}

const deleteBookPackage = (deletedId) => {
    return axios.delete(`/admin/api/v1/book-packages/${deletedId}`, { headers: authHeader() })
}

const getAllModeId = () => {
    return axios.get('/admin/api/v1/book-packages/mode', { headers: authHeader() });
}

//cart
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
    getAllModeId
};  