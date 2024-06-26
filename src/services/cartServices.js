import axios from 'api/axios'

const getAllCart = async () => {
    return axios.get(`/store/api/v1/cart-details?user=user1`)
}

export default {
    getAllCart,
};