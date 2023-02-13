import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    playerDetails: "",
    paymentDetails: false,
    playerSpec: "",
    navName:""
}

const playerLoginSlice = createSlice({
    name: "player",
    initialState: INITIAL_STATE,
    reducers: {
        loginPlayer: (state, action) => {
            state.playerDetails = action.payload
        },
        logoutPlayer: (state, action) => {
            state.playerDetails = false
            state.paymentDetails = false
            state.navName = false
        },
        paymentCheck: (state, action) => {
            state.paymentDetails = action.payload
        },
        playerProfile: (state, action) => {
            state.playerSpec = action.payload
        },
        nameNav: (state,action) =>{
            state.navName = action.payload
        }
    }
})

export const { loginPlayer, logoutPlayer, paymentCheck,playerProfile,nameNav } = playerLoginSlice.actions

export default playerLoginSlice.reducer