const { Model, Datatypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    user_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.email,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  { sequelize }
);
