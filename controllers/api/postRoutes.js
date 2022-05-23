const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [Comment],
  });
  res.json(posts);
});

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
router.put("/:id", async (req, res) => {
  try {
  const update = await Post.update(
    {
      text: req.params.text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.sendStatus(204)
  } catch(err) {
    console.log(err)
  }


});
router.delete("/:id", async (req, res) => {
  try {
    Post.destroy({
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
