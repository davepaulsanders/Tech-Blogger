const router = require("express").Router();

const { User, Post } = require("../../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [Post],
    attributes: ["id", "userName", "email"],
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: [Post],
    attributes: ["userName", "email"],
  });
  res.json(user);
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.userName;
      req.session.loggedIn = true;
      res.redirect("/");
    });
  });
});

router.post("/", async (req, res) => {
  const newUser = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  User.create(newUser).then((data) => {
    req.session.save(() => {
      req.session.userId = data.id;
      req.session.username = data.userName;
      req.session.loggedIn = true;
      console.log(req.session);
      res.redirect("/");
    });
  });
});

router.put("/:id", async (req, res) => {
  const newUser = {
    userName: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const userUpdate = await User.update(newUser, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "User updated!" });
  } catch (err) {
    console.log(err.message);
    res.end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    await req.session.destroy(() => {
      res.status(204).end();
    });
  }
});

module.exports = router;
