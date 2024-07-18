import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllUserOrder = (size) => {
    return axios.get('/admin/api/v1/orders', {
        params: size
    }, { headers: authHeader() });
}

const getUserOrders = (username) => {
    return axios.get(`/store/api/v1/customers/${username}/orders`, { headers: authHeader() });
}

export default {
    getAllUserOrder,
    getUserOrders,
};