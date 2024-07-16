import axios from 'api/axios';
import authHeader from './authHeaderServices';

const getUserInfor = (username) => {
    return axios.get(`/store/api/v1/customer/${username}/shipments`, { headers: authHeader() });
}

const getShipServices = (districtId) => {
    return axios.get(`/store/api/v1/ghn/get-service/${districtId}`, { headers: authHeader() });
}

const calculateShippingFee = (toDistrictId, toWardCode, serviceId, quantity) => {
    return axios.get(`/store/api/v1/ghn/calculate-fee`, {
        params: { toDistrictId, toWardCode, serviceId, quantity },

    }, { headers: authHeader() });
}

const fetchShippingDate = (toDistrictId, toWardCode, serviceId) => {
    return axios.get(`/store/api/v1/ghn/delivery-time`, {
        params: { toDistrictId, toWardCode, serviceId },

    }, { headers: authHeader() });
}

export default {
    getUserInfor,
    getShipServices,
    calculateShippingFee,
    fetchShippingDate,
};
