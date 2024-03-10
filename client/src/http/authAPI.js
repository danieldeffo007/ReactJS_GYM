import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const loginAuth = async (login, password) => {
    const {data} = await $host.post('/api/adminAuth/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
        const { data } = await $authHost.get('/api/adminAuth/check');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
}
