const mongoose = require("mongoose");

const WishListSchema = mongoose.Schema({
    id:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String},
    userID:{type:String,required:true}
});

const WishListModel = mongoose.model("WishList",WishListSchema);

module.exports={
    WishListModel
}