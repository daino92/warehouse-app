import axios from 'axios';
import {info} from '../src/util/env';

// Get the info from env.js
const username = info.username;
const password = info.password;
const url = info.baseAPI ? info.baseAPI : info.fauxAPI;

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
        'Authorization': `Basic ${token}`
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