const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

// Create order
router.post("/", orderController.createOrder);
// Update order
router.put("/:id", orderController.updateOrder);
// Delete order
router.delete("/:id", orderController.deleteOrder);
// Get all order
router.get("/allOrders", orderController.getAllOrders);

module.exports = router;