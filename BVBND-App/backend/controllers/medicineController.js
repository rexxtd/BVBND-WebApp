const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Time = require("../customClass/Time");

// Create medicine when doctor gives customer
module.exports.createMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine({
            doctorId: req.body.doctorId,
            medicines: req.body.medicines,
            description: req.body.description,
            charge: req.body.charge,
        });
        const medicine = await newMedicine.save();
        const appointment = await Appointment.findOne({
            doctorId: req.body.doctorId,
            customerId: req.body.customerId,
            bookingStartDate: Time.convertDateTimeStrToDate(
                req.body.bookingStartDate
            ),
        });
        const customer = await Customer.findOne({
            customerId: req.body.customerId,
        });
        await appointment.update({ medicine: newMedicine._id });
        await customer.update({ medicines: newMedicine._id });
        return res.status(200).json(medicine);
    } catch (err) {
        return res.status(500).json("Fail to create medicines");
    }
};
