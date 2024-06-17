import axios from "api/axios";

//Category
const createCategory = (createData) => {
    return axios.post('/api/v1/admin/categories', createData);
}

const getAllCategory = () => {
    return axios.get('/api/v1/admin/categories');
}

const updateCategory = (updatedData) => {
    return axios.put('/api/v1/admin/categories', updatedData);
}

const deleteCategory = (deletedId) => {
    return axios.delete(`/api/v1/admin/categories/${deletedId}`);
}

//Genre
const getAllGenre = () => {
    return axios.get('/api/v1/admin/genres');
}
const createGenre = (createGenre) => {
    return axios.post('/api/v1/admin/genres', createGenre);
}

export default {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getAllGenre,
    createGenre,
};  