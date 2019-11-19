import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;