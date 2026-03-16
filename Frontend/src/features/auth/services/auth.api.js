import api from "@/api/httpClient";

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const registerUser = (data) => {
    return api.post("/auth/register", data);
};

export const getUser = () => {
    return api.get("/auth/get-me");
};

export const logoutUser = () => {
    return api.get("/auth/logout");
}