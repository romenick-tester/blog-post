const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const [home, about, contact] = require("./content");

let newBlogs = [];

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
    res.render("post", { blogs: newBlogs });
});

app.get("/compose", (req,res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const newPost = {
        id: newBlogs.length + 1,
        title: req.body.title,
        body: req.body.body
    }

    newBlogs.push(newPost);

    res.redirect("/blog");
});

app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;

    const query = newBlogs.find((item) => item.id === Number(postId));

    if (!query) {

        res.send("this post is not recorded...");

    } else {

        const { title, body, id } = query;

        res.render("singlePost", { title, body, id });
    }
})

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;

    const updatedBlogs = newBlogs.filter((item) => item.id !== Number(postId));

    newBlogs = updatedBlogs;

    res.redirect("/blog");
})



let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`) );
