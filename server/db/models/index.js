const User = require("./user");
const Article = require("./article");
const Ingredient = require("./ingredient");

User.belongsToMany(Article, { through: "user-article" });
Article.belongsToMany(User, { through: "user-article" });
Article.hasMany(Ingredient);
Ingredient.belongsTo(Article, { as: "article" });

module.exports = {
  User,
  Article,
  Ingredient
};
