const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// GET route for homepage
router.get("/", (req, res) => {
  Post.findAll({
    include: [{ model: User, attributes: ["userName"] }],
  }).then((posts) => {
    console.log("SESSION!!!! ");
    console.log(req.session);
    const allPosts = posts.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      allPosts,
      username: req.session.username,
      loggedIn: req.session.loggedIn,
      homepage: true,
    });
  });
});

// GET route for specific post
router.get("/post/:id", async (req, res) => {
  let post = await Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["userName"],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ["userName"],
        },
      },
    ],
  });
  post = post.get({ plain: true });
  console.log(post);
  res.render("individual-post", {
    post,
    username: req.session.username,
    loggedIn: req.session.loggedIn,
  });
});

// GET route for login and sign up page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
