const router = require("express").Router();
const { Comment, User, Post } = require("../../models");

router.get("/", async (req, res) => {
  const posts = await Comment.findAll({
    include: [{ model: User, attributes: ["userName", "email"] }, Post],
  });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User, attributes: ["userName", "email"] }, Post],
  });
  res.json(post);
});

router.post("/", async (req, res) => {
  const newComment = {
    commentText: req.body.text,
    userId: req.session.user_id,
    postId: req.body.post,
  };

  console.log(newComment);
  try {
    const commentCreate = await Comment.create(newComment);
    res.json({ message: "Comment created!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

router.put("/:id", async (req, res) => {
  const updatedComment = {
    commentText: req.body.text,
  };
  try {
    const commentUpdate = await Comment.update(updatedComment, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Comment updated!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

router.delete("/:id", async (req, res) => {
  console.log('getting hereaksehgksuehglaksueghaksueghlaskuehg')
  try {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Comment deleted!" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
