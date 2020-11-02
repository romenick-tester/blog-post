const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const [home, about, contact] = require("./content");

const newBlogs = [];

app.get("/", (req,res) => {
    res.render("home", {title: "Home", body: home});
});

app.get("/about", (req,res) => {
    res.render("about", {title: "About", body: about});
});

app.get("/contact", (req,res) => {
    res.render("contact", {title: "Contact Us", body: contact});
});

app.get("/blog", (req,res) => {
    res.render("post", {blogs: newBlogs});
});

app.get("/compose", (req,res) => {
    res.render("compose");
});

app.post("/compose", (req,res) => {
    const newPost = {
        title: req.body.title,
        body: req.body.body
    }

    newBlogs.push(newPost);

    res.redirect("/");
});

let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`) );
