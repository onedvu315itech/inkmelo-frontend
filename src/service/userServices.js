import axios from 'api/axios'

const handleLoginApi = (username, password) => {
    return axios.post('/api/v1/auth/sign-in', {
        username: username,
        password: password,
    });
}

export default { handleLoginApi };