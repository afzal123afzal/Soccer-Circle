import axios from "axios";

export const axiosPlayersInstance = axios.create({
    baseURL: 'http://localhost:5000/api/player'
})

export const axiosClubsInstance = axios.create({
    baseURL: 'http://localhost:5000/api/club'
})

export const axiosAdminInstance = axios.create({
    baseURL: 'http://localhost:5000/admin'
})