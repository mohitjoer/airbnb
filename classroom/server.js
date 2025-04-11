const express = require("express");
const app = express();
const PORT = 3000;  


const Users = require("./routes/user.js");
const Posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const ejs = require("ejs");
app.set('view engine', 'ejs');

const sessionoptions = {secret : "mysupersecretstring",resave : false, saveUninitialized : true};
app.set('views', path.join(__dirname, 'views'));
app.use("/users", Users);
app.use("/posts", Posts);
app.use(cookieParser());
app.use(session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get("/register", (req, res) => {
    let { name = "mohit" } = req.query;
    req.session.name = name;
    
    if (name === "anonymous") {
        req.flash("error", "user not registered");
    }else  {
        req.flash("success", "User registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.render("page.ejs", { name: req.session.name });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});