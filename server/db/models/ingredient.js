const Sequelize = require("sequelize");
const db = require("../db");

const Ingredient = db.define("ingredients", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = Ingredient;
