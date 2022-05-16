const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Setting up associations which auto-creates foreign keys
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
