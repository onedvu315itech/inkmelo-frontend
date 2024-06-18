import axios from 'api/axios'

const getAllUser = () => {
    return axios.get('/admin/api/v1/users');
}

export default {
    getAllUser,
};