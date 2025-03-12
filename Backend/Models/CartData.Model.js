const mongoose = require("mongoose");


const CartSchema = mongoose.Schema({
    id:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    title:{type:String,required:true},
    quantity:{type:Number,required:true},
    description:{type:String},
    userID:{type:String,required:true}
});

const CartDataModel = mongoose.model("CartData",CartSchema); 

module.exports={
    CartDataModel
}