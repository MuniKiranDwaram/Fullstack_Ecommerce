const express = require("express");
const cors = require("cors");
const { CartDataModel } = require("../../Models/CartData.Model");

const app = express();
const CartRouter =  express.Router();
app.use(cors())
CartRouter.post("/SaveToCart",async (req,res)=>{
    try
    {
        const{id,image,price,title,description,userID} = req.body;
        const isItemExist = await CartDataModel.findOne({id:id,userID:userID});
        if(isItemExist)
        {
            await CartDataModel.findOneAndUpdate({id:id,userID:userID},{$inc:{quantity:1}});  
        }
        else
        {
            const Item = new CartDataModel({...req.body, quantity:1});
            await Item.save();   
        }

        res.status(200).json({message:"item added to the cart"});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
});

module.exports={
    CartRouter
}