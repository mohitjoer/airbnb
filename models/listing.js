const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review.js');


const listingschema =new schema({
        title: { 
                type: String,
                required: true
            },
        description: {
                type: String,
                required: true
            },
        image: {
                type: String,
                default: 'https://imgs.search.brave.com/PXJ2T2QhlhLfddhKG6GEerhtS-H2vqaVKWEK5mrL3jA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDc0/OTY2NzcxL3Bob3Rv/L3NlYXNjYXBlLWFu/ZC1zdW4tb24tYmx1/ZS1za3kuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXdlUldN/emZySlpJZDlvREdW/Z2Vqb1NjMGN5Snp5/WFZpV0FLdUdGc2R6/dTA9'
            },
        price: {
                type: Number,
                required: true
            },
        location: {
                type: String,
                required: true
            },
        country: {
                type: String,
                required: true
            },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]

});

listingschema.post("findOneAndDelete", async (listing)=> {
   if (listing) {
    await Review.deleteMany({_id : { $in: listing.reviews }});
   }
});


const listing= mongoose.model("listing", listingschema );
module.exports = listing;