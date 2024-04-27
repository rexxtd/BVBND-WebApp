const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Time = require("../customClass/Time");

// update a patient notes
module.exports.updateAppointment = async (req, res) => {
    try {
        const customer = await Appointment.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("Apppointment has been updated");
    } catch (err) {
        return res.status(500).json();
    }
};

// Filter out doctors who are available between from and to
const getAvailableDoctorsBetween = async (from, to) => {
    const allDoctors = (await Doctor.find()).filter(
        (doctor) => doctor.availableForBooking === true
    );
    const allAppointments = await Appointment.find();

    if (allAppointments.length === 0) return allDoctors;
    const availableDoctor = allDoctors.filter((doc) => {
        const appsForDoctor = allAppointments.filter(
            app =>  app.doctorId === doc.id);
        console.log(doc.username);
        console.log(appsForDoctor);
        if (appsForDoctor.length === 0) return true;
        for (const apps of appsForDoctor) {
            if (
                (from < apps.bookingStartDate && to > apps.bookingEndDate) ||
                (from > apps.bookingStartDate && from < apps.bookingEndDate) ||
                (to > apps.bookingStartDate && to <= apps.bookingEndDate)
            ){
                console.log("Yes");
                return false;
            }
        }
        return true;
    });
    return availableDoctor;
};

// View available doctors between from and to
module.exports.viewAvailableDoctors = async (req, res) => {
    try {  
        const from = Time.convertDateTimeStrToDate(req.params.from);
        const to = Time.convertDateTimeStrToDate(req.params.to);
        const availableDoctor = await getAvailableDoctorsBetween(from, to);
        return res.status(200).json(availableDoctor);
    } catch (err) {
        return res.status(500).json("Fail to view available doctors");
    }
};

// Create an Appointments when customer books doctor
module.exports.bookingDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.body.doctorId);
        const avaiDoctor = await getAvailableDoctorsBetween(
            Time.convertDateTimeStrToDate(req.body.bookingStartDate),
            Time.convertDateTimeStrToDate(req.body.bookingEndDate)
        );
        
        if(avaiDoctor.some(a=>a.username===doctor.username)){
            console.log(doctor);
            const newAppointment = new Appointment({
                doctorId: req.body.doctorId,
                customerId: req.body.customerId,
                bookingStartDate: Time.convertDateTimeStrToDate(
                    req.body.bookingStartDate
                ),
                bookingEndDate: Time.convertDateTimeStrToDate(
                    req.body.bookingEndDate
                ),
            });
            const appointment = await newAppointment.save();
            return res.status(200).json(appointment);
        }
        else res.status(301).json("Doctor is not available for this period");
    } catch (err) {
        res.status(500).json("Fail to book doctor");
    }
};

// Get all appointments for a doctor
module.exports.appointmentsForDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const allAppointments = await Appointment.find();
        const appsForDoctor = allAppointments.filter(
            (app) => app.doctorId === doctorId
        );
        return res.status(200).json(appsForDoctor);
    } catch (err) {
        return res.status(500).json("Fail to load appointments for doctor");
    }
};

// Get all appointments for a customer
module.exports.appointmentsForCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const allAppointments = await Appointment.find();
        const appsForCustomer = allAppointments.filter(
            (app) => app.customerId === customerId
        );
        return res.status(200).json(appsForCustomer);
    } catch (err) {
        return res.status(500).json("Fail to load appointments for customer");
    }
};
