const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Todos = db.define("njtodos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  IsCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Todos;
