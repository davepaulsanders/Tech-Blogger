const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  });
  const allPosts = posts.map((post) => post.get({ plain: true }));
  res.render("homePage", { allPosts, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/dashboard", async (req, res) => {
  const posts = await Post.findAll({
    where: {
      userId: req.session.userId,
    },
    include: [{ model: User, attributes: ["userName"] }],
  });
  const allPosts = posts.map((post) => post.get({ plain: true }));

  if (req.session.loggedIn) {
    res.render("dashboard", { allPosts, loggedIn: req.session.loggedIn });
  } else {
    res.render("login");
  }
});
module.exports = router;
