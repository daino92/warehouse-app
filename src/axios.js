import axios from 'axios';
import {info} from '../src/util/env';

// Get the info from env.js
const username = info.username;
const password = info.password;
const url = info.baseAPI ? info.baseAPI : info.fauxAPI;

export const source = axios.CancelToken.source();

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
    const timestamp = Math.round(new Date() / 1000);
    request.metadata = {start: timestamp}
    console.log(request);
    return request;
}, error => {
    console.log(error.response);
    return Promise.reject(error.response);
});

axiosInstance.interceptors.response.use(response => {
    const timestamp = Math.round(new Date() / 1000);
    response.config.metadata.end = timestamp;
    response.duration = response.config.metadata.end - response.config.metadata.start;
    console.log(response);
    console.log(`API request time: ${response.duration}s`);
    return response;
}, error => {
    console.log(error.response);
    return Promise.reject(error.response);
});

export default axiosInstance;