const express = require("express");
// The models need to be imported
const { User, Post, Comments } = require("./models");
const sequelize = require("./config/connection.js");
const routes = require("./controllers");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
