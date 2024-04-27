const Customer = require("../models/Customer");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

// Login Customer
module.exports.loginCus = async (req,res)=> {
    const user =  await Customer.findOne({ email: req.body.email });
    try {
        !user && res.status(404).json("Invalid user");
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Invalid password");
        return res.status(200).json(user);
    } catch (err) {
               return res.status(500).json(err);
    }
}

// Login Doctor
module.exports.loginDoc = async (req,res)=> {
    const user = await Doctor.findOne({ email: req.body.email });
    try {
        !user && res.status(404).json("Invalid user");
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Invalid password");
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}