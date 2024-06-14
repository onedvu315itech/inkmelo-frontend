import axios from "api/axios";

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

export default {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
};  