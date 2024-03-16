import axios from 'axios'
const api = axios.create({
    baseURL: 'http://192.168.163.190:8001'
});

export default api;