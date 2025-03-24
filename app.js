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


app.get('/listings',(req,res)=>{
    listing.find({}).then(res=>{
       console.log(res);
    });
    
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});