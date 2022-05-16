const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { all } = require("./api");
router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  });
  const allPosts = posts.map((post) => post.get({ plain: true }));
  res.render("homePage", { allPosts });
});

module.exports = router;
