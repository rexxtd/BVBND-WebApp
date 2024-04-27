const router = require("express").Router();
const AuthController = require("../controllers/authController");

// Login
router.post("/login/:type", AuthController.login);

module.exports = router;