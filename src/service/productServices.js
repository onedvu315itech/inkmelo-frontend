import axios from "api/axios";

const getAllCategory = (list) => {
    return axios.get('/api/v1/admin/categories');
}

const updateCategory = () => {
    return axios.put('api/v1/admin/categories', {

    })
}

export default {
    getAllCategory,
    updateCategory,
};  