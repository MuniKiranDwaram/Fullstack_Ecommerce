const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connect } = require("./database");
const { LoginRoute } = require("./Routes/Authentication/Login.Route");
const { RegisterRouter } = require("./Routes/Authentication/Register.Route");
const { loadProductsRoute } = require("./Routes/CartItems/LoadAllProducts");
const { CartRouter } = require("./Routes/CartItems/SaveCart.Router");
const { CartDataModel } = require("./Models/CartData.Model");
const { RemoveFromCartRouter } = require("./Routes/CartItems/RemoveFromCart");
const { SaveToWishListRouter } = require("./Routes/WishList/SaveToWishList.Route");
const { RemoveFromWishListRouter } = require("./Routes/WishList/RemoveFromWishList.Route");
const { WishListModel } = require("./Models/WishList.Model");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/",LoginRoute);

app.use("/",RegisterRouter);

app.use("/",loadProductsRoute);
app.use("/",CartRouter);
app.use("/",RemoveFromCartRouter);
app.use("/",SaveToWishListRouter);
app.use("/",RemoveFromWishListRouter);

app.get("/loadCartData",async (req,res)=>{
    try{
        const{userID} = req.query;
        if(userID)
        {
            const cart = await CartDataModel.find({userID});
            res.status(200).json({Data:cart});
        }
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

app.get("/loadWishList",async (req,res) =>
{
    const {userID} = req.query;
    try
    {
        const WishList = await WishListModel.find({userID:userID});
        return res.status(200).json({Data:WishList});
    }
    catch(err)
    {
        res.status(400).json({message:"Failed to Load the Wish List"});
    }
})

const PORT = "5000";
app.listen(PORT,async (req,res)=>{
    try{
        console.log(`server running on port ${PORT}`);
        await connect();
    }
    catch(err)
    {
        console.log(err);
    }
});