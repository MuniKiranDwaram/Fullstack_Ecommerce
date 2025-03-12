const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    "email":String,
    "username":String,
    "password":String,
    "phonenumber":String,
    "address":String
});

const UserModel = mongoose.model("User",UserSchema);

module.exports={
    UserModel,
}