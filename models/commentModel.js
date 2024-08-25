const Sequelize = require("@sequelize/core");

const db = require("../utils/database");
const User = require("./userModel");
const Blog = require("./blogModel");

const Comment = db.define("comment", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  content: {
    type: Sequelize.DataTypes.STRING(200),
    allowNull: false,
  },
  userId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  blogId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Blog,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Blog.hasMany(Comment, { foreignKey: "blogId" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

module.exports = Comment;
