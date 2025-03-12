const express = require("express");
const cors = require("cors");
const { WishListModel } = require("../../Models/WishList.Model");
const app = express();

app.use(cors);

const SaveToWishListRouter = express.Router();

SaveToWishListRouter.post("/SaveWishList",async (req,res)=>
{
    try{
        const{id,image,price,title,description,userID} = req.body;
        const isItemExist = await WishListModel.findOne({id:id,userID:userID});
        if(!isItemExist)
        {
            console.log("Item Saving");
            const Item = new WishListModel({...req.body});
            await Item.save();
            const WishListData = await WishListModel.find({userID});
            console.log(WishListData);
            return res.status(200).json({message:"Item Saved",Data:WishListData});
        }
        else
        {
            console.log("Item not Saving");
            const WishListData = await WishListModel.find({userID});
            console.log(WishListData);
            return res.status(200).json({message:"Item already exist",Data:WishListData});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports={
    SaveToWishListRouter
}