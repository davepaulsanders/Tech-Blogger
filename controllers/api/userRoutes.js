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

router.post("/", async (req, res) => {
  const newUser = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userCreate = await User.create(newUser);
    req.session.save(() => {
      req.session.userId = validUser.id;
      req.session.username = validUser.userName;
      req.session.loggedIn = true;
      res.json(validUser);
    });
  } catch (err) {
    console.log(err.message);
  }
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
      res.sendStatus(204);
    });
  }
});

router.post("/login", async (req, res) => {
  const validUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (validUser === null) {
    res.sendStatus(400);
    return;
  }
  const validPassword = await validUser.checkPassword(req.body.password);
  if (!validPassword) {
    res.sendStatus(400);
    return;
  }

  req.session.save(() => {
    req.session.userId = validUser.id;
    req.session.username = validUser.userName;
    req.session.loggedIn = true;
    res
      .status(200)
      .json({ user: validUser, message: "You are now logged in!" });
  });
});

module.exports = router;
