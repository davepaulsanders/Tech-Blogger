const express = require("express");
// The models need to be imported
const { User, Post, Comments } = require("./models");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection.js");
const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret:
    "a8w736vnao9w37m5ap9w83ntpaw98357npa98w7n35p98aw7n3p598a7wn3p59aw8n5p89aw",
  cookie: {
    maxAge: 300000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Public folder served as static assets
app.use(express.static(path.join(__dirname, "public")));

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
