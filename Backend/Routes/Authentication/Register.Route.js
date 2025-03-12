const express = require("express");
const {UserModel} = require("../../Models/User.Model");
const cors = require("cors");

const RegisterRouter = express.Router();

const app = express();

app.use(cors());

RegisterRouter.post("/register",async (req,res)=>{
    const {email,username,password,phonenumber,address} = req.body;
    try{
        const existingUser = await UserModel.findOne({email});
        console.log(req.body);
        if(existingUser)
        {
            return res.status(400).json({message:"user already exists"});
        }
        else
        {
            const user = new UserModel(req.body);
            await user.save();
            return res.status(200).json({message:"User has created successfully"});
        }
    }
    catch(err)
    {
        return res.status(400).json({err:"internal server error"});
    }
});

module.exports={
    RegisterRouter
}