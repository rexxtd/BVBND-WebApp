const Customer = require("../models/Customer");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

// Login
module.exports.login = async (req,res)=> {
    const user =  req.params.type==='customer' ? await Customer.findOne({ email: req.body.email }): await Doctor.findOne({ email: req.body.email });
    
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
}
