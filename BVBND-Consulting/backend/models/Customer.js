const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const CustomerSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
            unique: true,
        },
        dateOfBirth: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            max: 50,
        },
        amount: {
            type: Number,
        },
        medicines: {
            type: String,
        },
    },
    { timestamps: true }
);

CustomerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

CustomerSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
