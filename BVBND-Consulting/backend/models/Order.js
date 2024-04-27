const mongoose = require("mongoose");

const   OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
        },
        orderStatus: {
            type: String, 
        },
        orderAddress: {
            type: String,
        },
        orderPhoneNumber: {
            type:String,
        },    
        orderTotalPrice: {
            type: Number, 
        },
        userId: { 
            type: String, 
        },
        productId: {
            type: Array, 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
