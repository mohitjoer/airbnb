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

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError( 400 ,  result.error);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError( 400 ,  result.error);
    } else {
        next();
    }
};


// List properties
app.get('/listings',wrapAsync( async (req, res, next) => {
        const list = await listing.find({});
        res.render('listings/listing.ejs', { list });
}));

//new property 
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs");
});

// show property
app.get("/listings/:id",wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(); 
    const list = await listing.findById(id).populate("reviews");
    if (!list) return next(); 
    res.render("listings/show.ejs", { list });
}));

//new property
app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
    const list = new listing(req.body.listing);
    await list.save();
    res.redirect("/listings");
}));

// Edit property 
app.get('/listings/:id/edit',validateListing,wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    const list = await listing.findById(id);
    if (!list) return next();
    res.render('listings/edit.ejs', { list });
}));


app.put("/listings/:id",wrapAsync( async (req, res, next) => {
    if (!req.body.list) {
        throw new ExpressError(400,"Invalid Property Data");
    }
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.list });
    res.redirect(`/listings/${id}`);
}));

// Delete property
app.delete("/listings/:id",wrapAsync( async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


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
