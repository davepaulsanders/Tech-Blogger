const router = require("express").Router();

const { User, Post } = require("../../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [Post],
    attributes: ["userName", "email"],
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
    userName: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const userCreate = await User.create(newUser);
    res.json({ message: "User created!" });
  } catch (err) {
    console.log(err.message);
    res.end();
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

module.exports = router;
