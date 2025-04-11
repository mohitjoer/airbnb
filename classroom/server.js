const express = require("express");
const app = express();
const PORT = 3000;  


const Users = require("./routes/user.js");
const Posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");


const sessionoptions = {secret : "mysupersecretstring",resave : false, saveUninitialized : true};

app.use("/users", Users);
app.use("/posts", Posts);
app.use(cookieParser());
app.use(session({secret : "mysupersecretstring",resave : false, saveUninitialized : true}));


app.get("/register", (req, res) => {
    let {name = "mohit"} = req.query;
    res.send(`Hello ${name}, you have registered successfully!`);
});

app.get("/hello", (req, res) => {
    res.send(`Hello`);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});