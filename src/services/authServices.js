import axios from "api/axios";

class AuthService {
    async login(username, password) {
        return await axios.post('/api/v1/auth/sign-in', {
            username,
            password,
        })
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }

                return res.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
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