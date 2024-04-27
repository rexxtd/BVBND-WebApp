const asyncHandler = require('express-async-handler');
const Customer = require("../models/Customer");
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
global.rememberUser

// Register a customer
const registerCustomer = asyncHandler(async (req, res) => {
    const { username, email, idNumber, phoneNumber , password} = req.body;
    if (!username || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExist = await Customer.findOne({username, email});
    
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await Customer.create({
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
        password,
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

// Login with customer
const authCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            idNumber:user.idNumber,
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

/*
const authCustomer = async (req, res) => {
    const user = await Customer.findOne({ email: req.body.email });
    try {
        !user && res.status(404).json("Invalid user");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Invalid password");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
*/

// Update a customer
const updateCustomer = async (req, res) => {
    // if (req.body.customerId === req.params.id) {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json();
    }
};

// Update a customer
/*
const updateCustomer = async (req, res) => {
    // if (req.body.customerId === req.params.id) {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json();
    }
    // } else {
    //     return res.status(403).json("False to update");
    // }
};
*/

// Get customer by Id or name
const getCustomer = async (req, res) => {
    const customerId = req.query.customerId;
    const customername = req.query.customername;

    try {
        const customer = customerId
            ? await Customer.findById(customerId)
            : await Customer.findOne({ username: customername });
        const { password, address, idNumber, ...other } = customer._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
};

const allCustomers = async (req,res) =>{
    try{
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch(err){
        res.status(500).json(err);
    }
}

const searchAllCustomers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
        : {};
    
    const customers = await Customer.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(customers);
});

module.exports = { registerCustomer, updateCustomer, getCustomer, authCustomer, searchAllCustomers, allCustomers};