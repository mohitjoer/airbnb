const express = require('express');
const app = express();
const PORT = 3000;

const mongoose =require('mongoose');
const listing = require("./models/listing.js")
const path = require("path");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

//listing page for property\/
app.get('/listings',async(req,res)=>{
    const list = await listing.find({});
    res.render('listing.ejs',{list});
    
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});