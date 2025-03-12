const express = require("express");
const cors = require("cors");
const { WishListModel } = require("../../Models/WishList.Model");

const app = express();
app.use(cors);
const RemoveFromWishListRouter = express.Router();
RemoveFromWishListRouter.post("/removeWishListItem",async (req,res)=>
{
    try
    {
        const{id,image,price,title,description,userID} = req.body;
        const isItemExist = WishListModel.findOne({id:id,userID:userID});
        if(isItemExist)
        {
            await WishListModel.deleteOne({id:id,userID:userID});  
            const WishListData = await WishListModel.find({userID});
            return res.status(200).json({message:"Item removed Successfully",Data:WishListData});    
        }
        else{
            const WishListData = await WishListModel.find({userID});
            return res.status(200).json({message:"Item does not exist",Data:WishListData});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports={
    RemoveFromWishListRouter
}