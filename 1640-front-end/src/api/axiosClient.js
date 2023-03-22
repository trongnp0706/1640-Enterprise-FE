import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:1313', // Change to your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// You can add additional headers or interceptors here as needed

export default axiosClient;
