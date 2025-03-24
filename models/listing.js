const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
                filename: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true,
                    default: 'https://images.unsplash.com/photo-1742657914528-31c194363a16?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
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
            }
});

const listing= mongoose.model("listing", listingschema );


module.exports = listing;