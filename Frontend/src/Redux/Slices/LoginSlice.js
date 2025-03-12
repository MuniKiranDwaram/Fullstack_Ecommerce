import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice(
    {
        name:"login",
        initialState:
        {
            token:"",
            username:"",
            userId:"",
        },
        reducers:{
            authenticateUser:(state, action)=>
            {
                state.token = action.payload.token;
                state.username = action.payload.name;
                state.userId = action.payload.userID;
            },
        }
    })
export const {authenticateUser} = LoginSlice.actions;
export default LoginSlice.reducer;