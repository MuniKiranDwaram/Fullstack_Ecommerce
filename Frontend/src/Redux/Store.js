import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from '../Redux/Slices/LoginSlice';
import LoadProductsReducer  from "./Slices/LoadProductsClise";
import AddToCartReducer from "./Slices/CartSlice";
import RemoveFromCartReducer from './Slices/CartSlice'
import SelectedItemReducer  from "./Slices/SelectedItemSlice";

//export the default exported reducer above

export const store = configureStore({
    reducer:{
        // add reducers here with their name
        login:LoginReducer,
        LoadProducts:LoadProductsReducer,
        CartData:AddToCartReducer,
        CartData:RemoveFromCartReducer,
        SelectedProduct:SelectedItemReducer,
    },
})