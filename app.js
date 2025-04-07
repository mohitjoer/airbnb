const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ExpressError = require("./utils/ExpressError.js");
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const mongo_url = 'mongodb://127.0.0.1:27017/cairbnb';
main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongo_url);
}

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError(error.details[0].message, 400);
        next();
    }
};

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});




app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);




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
