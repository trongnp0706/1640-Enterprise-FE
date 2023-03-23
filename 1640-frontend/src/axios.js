import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:1313/",
    withCredentials: true,
});
