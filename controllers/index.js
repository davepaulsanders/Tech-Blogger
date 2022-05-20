const router = require("express").Router();
const apiRoutes = require("./api");
const homePageRoutes = require("./homePageRoutes");

router.use("/api", apiRoutes);
router.use("/", homePageRoutes);
router.use((req, res) => {
  res.send(404).end();
});

module.exports = router;
