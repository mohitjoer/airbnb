const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const listing = require("./models/listing.js");
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ejs = require("ejs");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema  } = require("./schema.js");
const Review = require('./models/review.js');
const listings = require('./routes/listing.js');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

const mongo_url = 'mongodb://127.0.0.1:27017/cairbnb';
main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongo_url);
}


app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError( 400 ,  result.error);
    } else {
        next();
    }
};

app.use("/listings", listings);


// review for property
app.post('/listings/:id/reviews', validateReview , wrapAsync(async (req, res, next) => {
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
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res, next) => {
    const {id , reviewId} = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

// error handelers
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    console.error("Error Details:", err);
    const { statusCode = 500, message = "Something went wrong!" } = err; 
    res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
