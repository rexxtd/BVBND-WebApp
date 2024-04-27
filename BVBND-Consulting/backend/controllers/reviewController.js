const Review = require("../models/Review");
const Doctor = require("../models/Doctor");

// Create review
module.exports.createReview = async (req,res) => {
    try {
        const newReview = new Review({
            customerName: req.body.customerName,
            doctorId: req.body.doctorId,
            desc: req.body.desc,
        });
        const review = await newReview.save();
        const doctor = await Doctor.findById(req.body.doctorId);
        await doctor.update({reviews: [...doctor.reviews, newReview._id]});
        return res.status(200).json(review);
    } catch (err) {
        return res.status(500).json("Fail to create review");
    }
}

// Get review by Id
module.exports.getReview = async (req, res) => {
    const reviewId = req.query.reviewId;
    try {
        const review = await Review.findById(reviewId);
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json(err);
    }
};


