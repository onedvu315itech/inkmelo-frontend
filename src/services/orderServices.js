import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllUserOrder = () => {
    return axios.get('/admin/api/v1/orders', { headers: authHeader() });
}

const getUserOrders = (username) => {
    return axios.get(`/store/api/v1/customers/${username}/orders`, { headers: authHeader() });
}

export default {
    getAllUserOrder,
    getUserOrders,
};