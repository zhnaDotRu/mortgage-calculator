import axios from 'axios';

export default function () {
    const data = {
        baseURL: '',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const instance = axios.create(data);

    instance.interceptors.response.use( (res) => {
        return res;
    }, (error) => {
        /*console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);*/
        return Promise.reject(error);
    });

    return instance;
}