import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.45:8001'
});

export default api;