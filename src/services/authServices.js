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

    register(username, fullname, email, password, confirmPassword, role) {
        return axios.post('/api/v1/users/register', {
            username,
            fullname,
            email,
            password,
            confirmPassword,
            role,
        });
    }
}

export default new AuthService();