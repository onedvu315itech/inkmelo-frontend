import axios from 'api/axios'
import authHeader from './authHeaderServices';

const getAllUser = () => {
    return axios.get('/admin/api/v1/users', { headers: authHeader() });
}

const getUserInfor = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/shipments`, { headers: authHeader() });
}

const updateUser = (username, updateData) => {
    return axios.put(`/store/api/v1/customer/${username}/shipments`, updateData, { headers: authHeader() })
}

const createUserInfor = (username, newUser) => {
    return axios.post(`/store/api/v1/customer/${username}/shipments`, newUser, { headers: authHeader() });
}

const getDefaultUser = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/shipments/default`, { headers: authHeader() })
}
export default {
    getAllUser,
    getUserInfor,
    getDefaultUser,
    updateUser,
    createUserInfor,
};