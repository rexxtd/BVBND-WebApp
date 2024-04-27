const customerController = require("../controllers/customerController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddlewareDoctor")

// Register a customer
router.route("/register").post(customerController.registerCustomer).get(protect,customerController.searchAllCustomers);
// Login with customer
router.post("/login", customerController.authCustomer);
// Update a customer
router.put("/:id", customerController.updateCustomer);
// Get a customer
router.get("/", customerController.getCustomer);
// Get all customers
router.get("/all", customerController.allCustomers);

module.exports = router;