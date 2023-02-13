import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    adminDetails: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState: INITIAL_STATE,
    reducers: {
        loginAdmin: (state, action) => {
            state.adminDetails=action.payload

            // let {adminDetails} = state
            // adminDetails = action.payload
            // console.log(adminDetails);

            // return { ...state, adminDetails }
          
        },
        logoutAdmin : (state)=>{
            state.adminDetails=false
        }
    }
})

export const { loginAdmin,logoutAdmin } = adminSlice.actions

export default adminSlice.reducer