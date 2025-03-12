const express = require("express");
const cors = require("cors");
const { CartDataModel } = require("../../Models/CartData.Model");
const app = express();
const RemoveFromCartRouter = express.Router();

app.use(cors());

RemoveFromCartRouter.post("/RemoveFromCart", async (req, res) => {
    const flag = req.query.flag;
    const { id, image, price, title, description, userID } = req.body;
    console.log(flag);
    if(flag == "false")
    {
        console.log("flag is here");
        try {
        
            // Find the item in the cart for the user
            const isItemPresent = await CartDataModel.findOne({ id: id, userID: userID });
        
            if (isItemPresent) {
              // Check if the quantity is greater than 1 before reducing
              if (isItemPresent.quantity > 1) {
                await CartDataModel.findOneAndUpdate(
                  { id: id, userID: userID },
                  { $inc: { quantity: -1 } }
                );
                return res.status(200).json({ message: "Item quantity updated" });
              } else {
                // If quantity is 1, you might want to remove the item entirely from the cart
                await CartDataModel.deleteOne({ id: id, userID: userID });
                return res.status(200).json({ message: "Item removed from cart" });
              }
            } else {
              return res.status(404).json({ message: "Item not found in cart" });
            }
          } catch (error) {
            return res.status(500).json({ error: "Something went wrong" });
          }
    }
    else{
        const isItemPresent = await CartDataModel.findOne({id:id,userID:userID});
        if(isItemPresent)
        {
            await CartDataModel.deleteOne({id:id,userID:userID});
        }
    }
  });

module.exports={
    RemoveFromCartRouter
}