import axios from "axios";
const api = axios.create({
    baseURL: 'https://inkmelo-springboot-be.onrender.com'
});

export default api;