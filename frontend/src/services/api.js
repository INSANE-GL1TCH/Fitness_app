import axios from 'axios';

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type":"multipart/form-data",
    },
});

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    }
});

const config ={
    headers:{
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export const createUserApi = (data) => ApiFormData.post("/api/user/registerUser", data);

export const login = (data) => Api.post("/api/user/userLogin", data,config);

