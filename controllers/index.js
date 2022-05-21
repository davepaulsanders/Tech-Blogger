const router = require("express").Router();
const apiRoutes = require("./api");
const homePageRoutes = require("./homePageRoutes");
const dashBoardRoutes = require("./dashboardRoutes");

router.use("/api", apiRoutes);
router.use("/", homePageRoutes);
router.use("/dashboard", dashBoardRoutes);

router.use((req, res) => {
  res.send(404).end();
});

module.exports = router;
