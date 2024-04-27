const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        adminname:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    },
    {timestamps : true}
)

module.exports = mongoose.model("Admin", AdminSchema);