const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      userId: req.session.userId,
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
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("dashboard", {
        posts,
        username: req.session.username,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      // use the ID from the session
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
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        username: req.session.username,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/comment/:id", withAuth, (req, res) => {
  Comment.findOne({
    where: {
      // use the ID from the session
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["userName", "id"],
      },
    ],
  })
    .then((dbCommentData) => {
      const comment = dbCommentData.get({ plain: true });
      res.render("edit-comment", {
        comment,
        username: req.session.username,
        loggedIn: req.session.loggedIn,
        created: comment.id === req.session.id ? true : false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
