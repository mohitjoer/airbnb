const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const Review = require('../models/review.js');
const methodOverride = require("method-override");



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError( 400 ,  result.error);
    } else {
        next();
    } 
};

// review for property
router.post('/', validateReview , wrapAsync(async (req, res, next) => {
    const page = await listing.findById(req.params.id);
    if (!page) {
        throw new ExpressError("Listing not found", 404);
    }
    const review = new Review(req.body.review);
    page.reviews.push(review);
    await review.save();
    await page.save();
    res.redirect(`/listings/${req.params.id}`);
}));

// delete review 
router.delete('/:reviewId', wrapAsync(async (req, res, next) => {
    const {id , reviewId} = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));


module.exports = router;