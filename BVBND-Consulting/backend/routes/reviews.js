const reviewController = require("../controllers/reviewController");
const router = require("express").Router();

// Create review when customer gives doctor
router.post("/give", reviewController.createReview);
// Get review by Id
router.get("/get", reviewController.getReview);

module.exports = router;