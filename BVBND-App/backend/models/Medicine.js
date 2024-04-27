const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
    {
        medicines: {
            type: Array
        },
        description: {
            type: String
        },
        charge: {
            type: Number,
        },
        doctorId: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Medicines", MedicineSchema);
