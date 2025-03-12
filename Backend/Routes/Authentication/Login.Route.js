const express = require("express");
const {UserModel} = require("../../Models/User.Model");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const LoginRoute = express.Router();

LoginRoute.post("/login",async (req,res)=>{
    try
    {
        const{email,password} = req.body;
        const authenticated = await UserModel.findOne({email});
        if(authenticated)
        {
            if(password === authenticated.password)
            {
                const token = jwt.sign({email},"secret");
                return res.status(200).json({UserId:authenticated._id,message:token,name:authenticated.username,Statusmessage:"Login Successful"});
            }
        }
        else
        {
            return res.status(401).json({Statusmessage:"Wrong Credentials"});
        }
    }
    catch(error){
        console.log(error)
    }
})

module.exports={LoginRoute}