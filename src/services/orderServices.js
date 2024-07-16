import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllUserOrder = () => {
    return axios.get('/admin/api/v1/orders', { headers: authHeader() });
}

export default {
    getAllUserOrder,
};