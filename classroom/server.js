const express = require("express");
const app = express();
const PORT = 3000;  



const User = require("./routes/user.js");



app.get("/", (req, res) => {
    res.send("Welcome to the Home Page!");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});