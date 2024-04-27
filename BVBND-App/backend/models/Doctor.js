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
            default:
                "I remind my fellows, residents and medical students that what we do is a privilege. People let us into the most intimate aspects of their lives, and they look to us to help guide them through very complex and delicate situations."
        },
        currentDepartment:{
            type: String,
            default: "In our job, you will never go home at the end of the day thinking that you haven't done something valuable and important."
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "/assets/imgs/person/noAvatar.png"
            //"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
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
            default: true,
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
            default: "[Being a doctor] offers the most complete and constant union of those three qualities which have the greatest charm for pure and active minds - novelty, utility, and charity."
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