const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Reviews", ReviewSchema);