const express = require('express');
const app = express();
const PORT = 3000;

const mongoose =require('mongoose');
const listing = require("./models/listing.js")

const mongo_url = 'mongodb://127.0.0.1:27017/wanderl';
main()
.then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}


app.get('/',async (req,res)=>{
    let sampletesting = new listing({
        title:"my new villa",
        discription:"by the beach",
        price:1200,
        location:"goa",
        country:"india",
    })
    await sampletesting.save()
    .then(()=>{
        console.log("saved");
    }).catch(err=>{
        console.log(err);
    });
    res.send("successful");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});