import {$authHost} from "./index";

export const trainerGetALL = async () => {
    const {data} = await $authHost.get('/api/trainer/getAll')
    return data
}

export const createTrainer = async (trainer) => {
    const {data} = await $authHost.post('/api/trainer/create', trainer )
    return data
}

export const updateTrainer = async (trainer) => {
    const {data} = await $authHost.post('/api/trainer/update', trainer )
    return data
}

export const deleteTrainer = async (trainer) => {
    const {data} = await $authHost.post('/api/trainer/delete', trainer )
    return data
}