const express = require("express");
const app = express();
const PORT = 3000;  



const Users = require("./routes/user.js");
const Posts = require("./routes/post.js");

app.use("/users", Users);
app.use("/posts", Posts);



app.get("/getcookies", (req, res) => {
    res.cookie("name", "John Doe");
    res.cookie("age", "30");
    res.send("Cookies are not set yet.");
});

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page!");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});