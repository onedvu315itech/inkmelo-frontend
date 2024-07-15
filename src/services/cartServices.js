import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllCart = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/cart-details`, { headers: authHeader() });
}
const addToCart = (username, data) => {
    return axios.post(`/store/api/v1/customer/${username}/cart-details`, data, { headers: authHeader() });
}

export default {
    getAllCart,
    addToCart,
};