import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { SaveToCart } from "../../../api";

const CartData = createSlice ({
    name:"CartData",
    initialState:{
        cartItems:[],
        totalPrice:0,
        totalItems:0,
        WishList:[],
    },
    reducers:{
        AddToCart:(state,action)=>{
            const {id,image,price,title,description} = action.payload;
            const isExist = state.cartItems.find(item=>item.id == id);
            if(isExist)
            {
                state.cartItems = state.cartItems.map(item=>item.id===id ? {...item,quantity:item.quantity + 1} : item);
                const quantity = isExist.quantity;
            }
            else
            {
                state.cartItems = [...state.cartItems,{id,image,price,quantity:1}];
            }
            state.totalItems = state.totalItems +  1;
            state.totalPrice = state.totalPrice + action.payload.price;
        },
        RemoveFromCart:(state,action)=>{
            const {id,image,price} = action.payload;
            const isExist = state.cartItems.find(item=>item.id == id);
            if(isExist)
            {
                if(state.cartItems.find(item=>(item.id === id && item.quantity === 1)))
                {
                    const index = state.cartItems.findIndex(item=>item.id === id);
                    const newData = [...state.cartItems];
                    newData.splice(index,1);
                    state.cartItems = newData;
                }
                else
                {
                    state.cartItems = state.cartItems.map(item => item.id === id ? {...item,quantity:item.quantity - 1} : item);
                }
                state.totalItems = state.totalItems -  1;
                state.totalPrice = state.totalPrice - action.payload.price;
            }
        },
        SetTotalProducts:(state,action)=>
        {
            state.totalItems = action.payload.totalItems;
        },
        UpdateWishList:(state,action) => {
            const{id,title,price,description} = action.payload;
            if(!state.WishList.find({id}))
            {
                state.WishList = [...state.WishList,action.payload];
            }
        }
    }
});

export const{AddToCart,RemoveFromCart,SetTotalProducts} = CartData.actions;
export default CartData.reducer;