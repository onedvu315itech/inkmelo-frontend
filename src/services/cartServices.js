import axios from 'api/axios'

const getAllCart = () => {
    return axios.get(`/store/api/v1/customer/user1/cart-details`)
}
const addToCart = (data) => {
    return axios.post(`/store/api/v1/customer/user1/cart-details`, data)
}

export default {
    getAllCart,
    addToCart,
};