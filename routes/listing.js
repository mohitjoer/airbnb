const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const Review = require('../models/review.js');
const methodOverride = require("method-override");


const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError( 400 ,  result.error);
    } else {
        next();
    }
};



// List properties
router.get('/',wrapAsync( async (req, res, next) => {
        const list = await listing.find({});
        res.render('listings/listing.ejs', { list });
}));

//new property 
router.get('/new', (req, res) => {
    res.render("listings/new.ejs");
});

// show property
router.get("/:id",wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(); 
    const list = await listing.findById(id).populate("reviews");
    if (!list) return next(); 
    res.render("listings/show.ejs", { list });
}));


//new property
router.post("/",validateListing, wrapAsync(async (req, res, next) => {
    const list = new listing(req.body.listing);
    await list.save();
    res.redirect("/listings");
}));

// Edit property 
router.get('/:id/edit',validateListing,wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    const list = await listing.findById(id);
    if (!list) return next();
    res.render('listings/edit.ejs', { list });
}));


router.put("/:id",wrapAsync( async (req, res, next) => {
    if (!req.body.list) {
        throw new ExpressError(400,"Invalid Property Data");
    }
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.list });
    res.redirect(`/listings/${id}`);
}));

// Delete property
router.delete("/:id",wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


module.exports = router;