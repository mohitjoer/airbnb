const express = require("express");
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const Review = require('../models/review.js');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError(error.details[0].message, 400);
    } else {
        next();
    }
};

// Add a review
router.post('/', validateReview, wrapAsync(async (req, res, next) => {
    console.log(`Incoming request to add review for listing ID: ${req.params.id}`);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError("Invalid Listing ID", 400);
    }
    const page = await listing.findById(id);
    if (!page) {
        throw new ExpressError("Listing not found", 404);
    }
    const review = new Review(req.body.review);
    page.reviews.push(review);
    await review.save();
    await page.save();
    res.redirect(`/listings/${id}`);
}));

// Delete a review
router.delete('/:reviewId', wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;