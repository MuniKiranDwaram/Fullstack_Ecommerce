import axios from "axios";

const Api = axios.create({baseURL:"http://localhost:5000"})

export const login = async (formData) =>
{
    try{
        const res =  await Api.post("/login",formData)
        return res;
    }
    catch(err)
    {
        if(err.response)
            return err.response;
        else
            return err
    }
};

export const register = async (formdata) => {return await Api.post("/register",formdata);}

export const SaveToCart = async (cartData) => {return Api.post("/SaveToCart",cartData)};

export const SaveToWishList = async (item) => 
{
    try{
        const res = await Api.post("/SaveWishList",item);
        return res.data.Data;
    }
    catch(err)
    {
        console.log(err);
    }
};

export const RemoveFromWishList = async (item) => {
    try{
        const res = await  Api.post("/removeWishListItem",item)
        return res.data.Data;
    }
    catch(err)
    {
        console.log(err);
    }
};

export const LoadWishList = async (userID) => 
{
    const res = await Api.get(`/loadWishList?userID=${userID}`);
    return res.data.Data;
}

export const RemoveFromCart = async(cartData,RemoveCompleteItem) => 
{
    if(RemoveCompleteItem === true)
    {
        try
        {
            const response =await Api.post("/RemoveFromCart?flag=true",cartData);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    else
    {
        try
        {
            const response =await Api.post("/RemoveFromCart?flag=false",cartData);
        }
        catch(err)
        {
            console.log(err);
        }
    }
};

export const getLoginStatus = async (formData) =>{
    const response = await login(formData);
    return response;
}

export const LoadCartData = async(userID) => {
    try{
        const res = await Api.get(`/loadCartData?userID=${userID}`);
        return res.data.Data || [];
    }
    catch(err)
    {
        console.log(err);
    }
}

export const getAllProducts = async() =>
{
    const res = await Api.get("/loadProducts");
    return res.data.products;
}