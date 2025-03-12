import { createSlice } from "@reduxjs/toolkit";

const SelectedItem = createSlice({
    name:"SelectedProduct",
    initialState:{
        product:{},
    },
    reducers:{
        SelectedItemReducer:(state,action)=>
        {
            state.product = action.payload.product;
        }
    }

})

export const {SelectedItemReducer} = SelectedItem.actions;
export default SelectedItem.reducer;