const medicineController = require("../controllers/medicineController");
const router = require("express").Router();

// Create medicine when doctor gives customer
router.post("/give", medicineController.createMedicine);

module.exports = router;