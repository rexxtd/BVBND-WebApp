const express = require("express");
const { allUsers, authUser } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router();

router.route("/").get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;