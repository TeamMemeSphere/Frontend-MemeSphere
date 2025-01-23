import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.binance.com/api/v3",
});

export { axiosInstance };