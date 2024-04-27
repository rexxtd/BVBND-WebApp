const mongoose = require("mongoose");

const DrugSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
        },
        productName: {
            type: String, 
        },
        productDescribtion: {
            type: String,
        },
        img: {
            type: String,
        },
        price: {
            type: Number, 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Drug", DrugSchema);
