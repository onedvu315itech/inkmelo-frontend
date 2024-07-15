import axios from "axios";
import authHeader from "services/authHeaderServices";
const api = axios.create({
    baseURL: 'https://inkmelo-springboot-be-s2etd44lba-as.a.run.app',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        let jwtToken = authHeader().Authorization;
        if (jwtToken) config.headers['Authorization'] = jwtToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;