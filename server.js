const express = require("express");
// The models need to be imported
const { User, Post, Comments } = require("./models");
// helper functions for handlebars
const helpers = require("./utils/helpers");
// importing database connection
const sequelize = require("./config/connection.js");
// controllers
const routes = require("./controllers");
const path = require("path");
// express handlebars
const exphbs = require("express-handlebars");
// adding helpers to template engine
const hbs = exphbs.create({ helpers });
// using express session and connecting it to sequelize ORM store
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 300000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// creating session
app.use(session(sess));

// adding handlebars template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Public folder served as static assets
app.use(express.static(path.join(__dirname, "public")));

// using controllers
app.use(routes);

// setting up sequelize connection and then starting server
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
