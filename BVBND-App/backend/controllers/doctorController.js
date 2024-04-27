const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const Doctor = require("../models/Doctor");
const User = require('../models/userModel');
global.rememberUser

// Register a doctor
const registerDoctor = asyncHandler(async (req, res) => {
    const { username, email, idNumber, phoneNumber , password} = req.body;
    if (!username || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExist = await Doctor.findOne({username, email});
    
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    
    const user = await Doctor.create({
        username,
        email,
        phoneNumber,
        idNumber,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            idNumber: user.idNumber,
            token:generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }

        const userBackup = await User.create({
            username,
            email,
            idNumber,
            password
    });

    if (userBackup) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            idNumber: user.idNumber,
            token:generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create backup user");
    }
});
    
//Login with doctor
const authDoctor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Doctor.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            pic: user.pic,
            idNumber: user.idNumber,
            token:generateToken(user._id)
        });

        //for backup users id
        const userBackup = await User.findOne({ email });
        if (userBackup) {
            rememberUser = userBackup._id;
        }
    } 
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    console.log(`login id: ${rememberUser}`)
});

// Update a doctor
const updateDoctor = async (req, res) => {
    // if (req.body.customerId === req.params.id) {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json();
    }
};

/*
// Update a doctor
const updateDoctor = async (req, res) => {
    if (req.body.doctorId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json();
        }
    } else {
        return res.status(403).json("False to update");
    }
};
*/

// Get doctor by ID or name
const getDoctor = async (req, res) => {
    const doctorId = req.query.doctorId;
    const doctorname = req.query.doctorname;
    try {
        console.log(doctorname);
        const doctor = doctorId
            ? await Doctor.findById(doctorId)
            : await Doctor.findOne({ username: doctorname });
        const { password, address, idNumber, ...other } = doctor._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all doctos 
const allDoctors = async (req,res) => {
    try{
        const allDoctors = await Doctor.find();
        res.status(200).json(allDoctors);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const searchAllDoctors = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
        : {};
    
    const users = await Doctor.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { registerDoctor, updateDoctor, getDoctor, authDoctor, allDoctors, searchAllDoctors};