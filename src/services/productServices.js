import axios from "api/axios";

const getAllCategory = () => {
    return axios.get('/api/v1/admin/categories');
}

const updateCategory = (updatedData) => {
    console.log('Check updated data: ', updatedData);
    return axios.put('/api/v1/admin/categories', updatedData);
}

export default {
    getAllCategory,
    updateCategory,
};  