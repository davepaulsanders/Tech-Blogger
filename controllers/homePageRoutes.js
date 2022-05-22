const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  }).then((posts) => {
    console.log("SESSION!!!! ");
    console.log(req.session);
    const allPosts = posts.map((post) => post.get({ plain: true }));
    res.render("homepage", { allPosts, loggedIn: req.session.loggedIn });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
