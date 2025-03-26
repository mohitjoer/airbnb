const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const listing = require("./models/listing.js")
const path = require("path");
const ejsmate = require("ejs-mate");

const methodOverride = require("method-override");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

const mongo_url = 'mongodb://127.0.0.1:27017/cairbnb';
main()
.then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

// list page for property
app.get('/listings', async(req,res) => {
    const list = await listing.find({});
    res.render('listings/listing.ejs', {list});
});

// create new property 
app.get('/listings/new', async (req,res) => {
    res.render("listings/new.ejs");
});

// page for single property
app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/show.ejs", {list});
});

app.post("/listings",async( req,res)=>{
    let list = new listing(req.body.list);
    await list.save();
    res.redirect("/listings");
});

// edit the property details
app.get('/listings/:id/edit',async (req,res)=>{
    let {id}=req.params;
    const list = await listing.findById(id);
    res.render('listings/edit.ejs',{list});
});

app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.list});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async(req,res)=>{
    let {id}= req.params;
    let deleteprop = await listing.findByIdAndDelete(id);
    console.log(deleteprop);
    res.redirect("/listings");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});