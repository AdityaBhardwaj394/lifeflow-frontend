import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.144:8001'
});

export default api;