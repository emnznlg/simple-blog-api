const Sequelize = require("@sequelize/core");

const db = require("../utils/database");

const User = db.define("user", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: Sequelize.DataTypes.STRING,
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: Sequelize.DataTypes.STRING,
});

module.exports = User;
