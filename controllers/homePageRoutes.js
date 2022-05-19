const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  });
  const allPosts = posts.map((post) => post.get({ plain: true }));
  res.render("homepage", { allPosts, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/dashboard", async (req, res) => {
  if (req.session.loggedIn) {
    const posts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      include: [{ model: User, attributes: ["userName"] }],
    });
    const allPosts = posts.map((post) => post.get({ plain: true }));
    res.render("dashboard", { allPosts, loggedIn: req.session.loggedIn });
  } else {
    const posts = await Post.findAll();
    const allPosts = posts.map((post) => post.get({ plain: true }));
    res.render("homepage", { allPosts, loggedIn: req.session.loggedIn });
  }
});
module.exports = router;
