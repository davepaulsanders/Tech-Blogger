const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");


// GET all posts
router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [Comment],
  });
  res.json(posts);
});

// GET a single post
router.get("/:id", async (req, res) => {
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
  res.render("individual-post", { post, loggedIn: req.session.loggedIn });
});

// POST a post
router.post("/", withAuth, async (req, res) => {
  const newPost = {
    postTitle: req.body.title,
    postText: req.body.text,
    userId: req.session.userId,
  };

  try {
    const postCreate = await Post.create(newPost);
    res.json({ message: "Post created!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

// PUT a post
router.put("/:id", withAuth, async (req, res) => {
  const updatedPost = {
    postTitle: req.body.title,
    postText: req.body.text,
    userId: req.session.userId,
  };
  try {
    const postUpdate = await Post.update(updatedPost, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Post updated!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

// DELETE a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.render("dashboard", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
