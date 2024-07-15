import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllUser = () => {
    return axios.get('/admin/api/v1/users', { headers: authHeader() });
}

export default {
    getAllUser,
};