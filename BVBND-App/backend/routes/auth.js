const router = require("express").Router();
const AuthController = require("../controllers/authController");

// Login
// Login Customer
router.post("/login/customer", AuthController.loginCus);
// Login Docot
router.post("/login/doctor", AuthController.loginDoc);

module.exports = router;