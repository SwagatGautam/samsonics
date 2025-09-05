import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://localhost:7183/user"
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItmem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;