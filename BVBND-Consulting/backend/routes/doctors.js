const doctorController = require("../controllers/doctorController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddlewareDoctor")

// Register a Doctor
router.route("/register").post(doctorController.registerDoctor).get(protect, doctorController.searchAllDoctors);
// Login with doctor
router.post("/login", doctorController.authDoctor);
// Update a doctor
router.put("/:id", doctorController.updateDoctor);
// Get a doctor
router.get("/", doctorController.getDoctor);
// Get all doctors
router.get("/all", doctorController.allDoctors);

module.exports = router;
