import axios from 'api/axios';
import authHeader from './authHeaderServices';

const getUserDefaultInfor = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/shipments/default`, { headers: authHeader() })
}

const getUserInfor = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/shipments`, { headers: authHeader() });
}

const getShipServices = (districtId) => {
    return axios.get(`/store/api/v1/ghn/get-service/${districtId}`, { headers: authHeader() });
}

const getShippingFee = (toDistrictId, toWardCode, quantity, serviceId) => {
    return axios.get('/store/api/v1/ghn/calculate-fee', {
        params: toDistrictId, toWardCode, quantity, serviceId
    }, { headers: authHeader() });
}

const getShippingDate = (toDistrictId, toWardCode, serviceId) => {
    return axios.get('/store/api/v1/ghn/delivery-time', {
        params: toDistrictId, toWardCode, serviceId
    }, { headers: authHeader() });
}

const createOrder = (username, orderData) => {
    return axios.post(`/store/api/v1/customer/${username}/orders`, orderData, { headers: authHeader() });
}

export default {
    getUserInfor,
    getShipServices,
    getShippingFee,
    getShippingDate,
    getUserDefaultInfor,
    createOrder
};
