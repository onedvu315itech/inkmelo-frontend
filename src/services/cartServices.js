import axios from 'api/axios'

const getAllCart = async () => {
    return axios.get(`https://inkmelo-springboot-be-s2etd44lba-as.a.run.app/store/api/v1/customer/user1/cart-details`)
}

export default {
    getAllCart,
};