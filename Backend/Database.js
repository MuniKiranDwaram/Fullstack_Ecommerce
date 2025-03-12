const mongoose = require("mongoose");

const connect = async ()=> {
    try
    {
        mongoose.connect("mongodb://127.0.0.1:27017/MYDB");
        console.log("Connected to DB");
    }
    catch(err)
    {
        console.log("Connection error");
    }
}

module.exports={
    connect
}

