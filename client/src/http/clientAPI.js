import {$authHost} from "./index";
import {jwtDecode} from "jwt-decode";

export const clientGetALL = async () => {
    const {data} = await $authHost.get('/api/client/getAll')
    return data
}

export const createClient = async (client) => {
    const {data} = await $authHost.post('/api/client/create', client )
    return data
}

export const updateClient = async (client) => {
    const {data} = await $authHost.post('/api/client/update', client )
    return data
}

export const deleteClient = async (client) => {
    const {data} = await $authHost.post('/api/client/delete', client )
    return data
}