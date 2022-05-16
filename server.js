const express = require("express");
// The models need to be imported
const { User, Post, Comments } = require("./models");
const sequelize = require("./config/connection.js");
const routes = require("./controllers");
const path = require("path");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder served as static assets
app.use(express.static(path.join(__dirname, "public")));
// Importing from routes folder

app.use(routes);
// Using express session
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
