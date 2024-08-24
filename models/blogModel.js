const Sequelize = require("@sequelize/core");

const db = require("../utils/database");
const User = require("./userModel");

const Blog = db.define("blog", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: Sequelize.DataTypes.STRING(200),
    allowNull: false,
  },
  content: {
    type: Sequelize.DataTypes.STRING(2000),
    allowNull: false,
  },
  userId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // 'User' is the model name you defined
      key: "id", // 'id' is the primary key of the User model
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

module.exports = Blog;
