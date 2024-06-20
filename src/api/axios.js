import axios from "axios";
const api = axios.create({
    baseURL: 'https://inkmelo-springboot-be-s2etd44lba-as.a.run.app'
});

export default api;