import { createSlice } from "@reduxjs/toolkit";

const LoadProducts = createSlice(
    {
        name:"LoadProducts",
        initialState:
        {
            products:[],
            searchQuery:"",
        },
        reducers:{
            LoadAllProducts:(state,action)=>{
                state.products= action.payload.products;
                state.searchQuery = action.payload.query;
            }
        }
    }
)

export const{LoadAllProducts} = LoadProducts.actions;
export default LoadProducts.reducer;