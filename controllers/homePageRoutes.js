const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  });
  const allPosts = posts.map((post) => post.get({ plain: true }));
  res.render("homePage", { allPosts });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
module.exports = router;
