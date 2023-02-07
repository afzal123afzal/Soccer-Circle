import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    clubDetails: "",
    paymentDetails: false,
    clubSpec: "",
    navName:""
}

const clubLoginSlice = createSlice({
    name: "club",
    initialState: INITIAL_STATE,
    reducers: {
        loginClub: (state, action) => {
            state.clubDetails = action.payload
        },
        logoutClub: (state, action) => {
            state.clubDetails = false
            state.paymentDetails = false
            state.navName = false
        },
        paymentCheck: (state, action) => {
            state.paymentDetails = action.payload
        },
        clubProfile: (state, action) => {
            state.clubSpec = action.payload
        },
        nameNav: (state,action) =>{
            state.navName = action.payload
        }
    }
})

export const { loginClub, logoutClub, paymentCheck,clubProfile,nameNav } = clubLoginSlice.actions

export default clubLoginSlice.reducer