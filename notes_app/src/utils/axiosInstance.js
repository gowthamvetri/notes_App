import axios from 'axios'
import {BASE_URL} from './constants.js'

const axiosInstance = axios.create({
    baseURL : 'https://notes-app-8qur.vercel.app/',
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json"
    },
})

axiosInstance.interceptors.request.use(
    async (config)=>{ 
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstance
