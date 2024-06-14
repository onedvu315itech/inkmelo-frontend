import axios from "api/axios";

const getAllCategory = () => {
    return axios.get('/api/v1/admin/categories');
}

const updateCategory = (updatedData) => {
    console.log('Check updated data: ', updatedData);
    return axios.put('/api/v1/admin/categories', updatedData);
}

const createCategory = (createData) => {
    console.log('Check create data', createData);
    return axios.post('/api/v1/admin/categories', createData);
}

export default {
    getAllCategory,
    updateCategory,
    createCategory,
};  