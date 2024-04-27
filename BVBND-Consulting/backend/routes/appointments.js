const appointmentController = require("../controllers/appointmentController");
const router = require("express").Router();

// Create appointment
router.post("/booking", appointmentController.bookingDoctor);
// View available doctos between
router.get("/alldoctors/:from/:to", appointmentController.viewAvailableDoctors);
// Update an appointment
router.put("/:id", appointmentController.updateAppointment);
// Get all appointments for doctor
router.get("/:doctorId", appointmentController.appointmentsForDoctor);
// Get all appointments for doctor
router.get("/forCustomer/:customerId", appointmentController.appointmentsForCustomer);

module.exports = router;
