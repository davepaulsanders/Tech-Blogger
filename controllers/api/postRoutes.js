const router = require("express").Router();
const { Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [Comment],
  });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [Comment],
  });
  res.json(post);
});

router.post("/", async (req, res) => {
  const newPost = {
    postTitle: req.body.title,
    postText: req.body.text,
    userId: req.session.user_id,
  };

  try {
    const postCreate = await Post.create(newPost);
    res.json({ message: "Post created!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

router.put("/:id", async (req, res) => {
  const updatedPost = {
    postTitle: req.body.title,
    postText: req.body.text,
    userId: req.body.userId,
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

router.delete("/:id", async (req, res) => {
  try {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Post deleted!" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
