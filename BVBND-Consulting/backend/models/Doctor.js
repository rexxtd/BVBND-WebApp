const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const DoctorSchema = mongoose.Schema(
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
        dateOfBirth: {
            type: String,
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
        workingDesc: {
            type: String,
        },
        currentDepartment:{
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
        rating: {
            type: Number,
        },
        numberOfBookings: {
            type: Number,
            default: 0,
        },
        availableForBooking: {
            type: Boolean,
            default: false,
        },
        isAutherized: {
            type: Boolean,
            default: false,
        },
        reviews: {
            type: Array,
            default: [],
        },
        services: {
            type: String,
        },
    },
    { timestamps: true }
);

DoctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

DoctorSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;