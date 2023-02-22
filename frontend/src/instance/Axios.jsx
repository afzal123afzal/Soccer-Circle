import axios from "axios";

export const axiosPlayersInstance = axios.create({
    baseURL: '/api/player'
})

export const axiosClubsInstance = axios.create({
    baseURL: '/api/club'
})

export const axiosAdminInstance = axios.create({
    baseURL: '/admin'
})
