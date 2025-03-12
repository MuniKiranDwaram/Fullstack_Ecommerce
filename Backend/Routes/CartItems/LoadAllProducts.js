const express = require("express");

const app = express();

const loadProductsRoute = express.Router();

loadProductsRoute.get("/loadProducts",async (req,res)=>{
    try{
        const products = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json());
        res.status(200).send({products});
    }
    catch(error)
    {
        res.status().send("Error");
    }
})

module.exports={
    loadProductsRoute,
}