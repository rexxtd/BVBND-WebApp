const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        doctorId: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        currentCharge: {
            type: Number,
        },
        medicines: {
            type: Array,
        },
        notes: {
            type: String,
        },
        bookingStartDate: {
            type: Date,
        },
        bookingEndDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointments", AppointmentSchema);
