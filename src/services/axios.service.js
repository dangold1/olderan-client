
import axios from 'axios';
import localStorageService from './localStorage.sevice';

const axiosService = {};
const getAxiosRequest = method => {
    switch (method.toLowerCase()) {
        case "get": return axios.get;
        case "post": return axios.post;
        case "put": return axios.put;
        case "delete": return axios.delete;
    }
}

axiosService.send = async ({ method = "get", url, data, ...restOptions }) => {
    try {
        const axiosRequest = getAxiosRequest(method);
        const response = await axiosRequest(url, {
            data,
            headers: {
                'Content-Type': 'application/json',
                "x-token": localStorageService.getToken(),
            },
            ...restOptions
        })
        return response;
    } catch (err) {
        throw new Error(err.response?.data ?? err?.message ?? "Request Faild");
    }
}


export default axiosService;