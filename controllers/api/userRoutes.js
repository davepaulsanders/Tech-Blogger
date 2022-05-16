const router = require("express").Router();

const { User, Post } = require("../../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [Post],
  });
  res.json(users);
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

module.exports = router;
