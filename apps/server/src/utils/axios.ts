import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.GITHUB_API_BASE_URL,
    timeout: 5000,
})