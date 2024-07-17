import axios from "api/axios";

class AuthService {
    async login(username, password) {
        return await axios.post('/store/api/v1/auth/sign-in', {
            username,
            password,
        });
    }

    logout() {
        sessionStorage.clear();
    }

    async register(registerData) {
        return axios.post('/store/api/v1/users/register', registerData);
    }

    async loginGoogle(data) {
        return await axios.post('/store/api/v1/oauth2/google', data);
    }
}

export default new AuthService();