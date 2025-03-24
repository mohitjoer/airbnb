const express = require('express');
const app = express();
const PORT = 3000;

const mongoose =require('mongoose');

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


app.use('/',(req,res)=>{
    res.send(`Server is running on ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});