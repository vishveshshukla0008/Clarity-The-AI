import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const apiError = {
            status: error.response?.status || 500,
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            errors: error.response?.data?.errors || null
        };

        return Promise.reject(apiError);
    }
);

export default api;