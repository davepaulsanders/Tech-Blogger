const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Comment extends Model {}

Comment.init(
  {
    commentText: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, underscored: false, modelName: "comment" }
);

module.exports = Comment;
