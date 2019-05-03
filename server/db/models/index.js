const User = require("./user");
const Article = require("./article");

User.belongsToMany(Article, { through: "user-article" });
Article.belongsToMany(User, { through: "user-article" });

module.exports = {
  User,
  Article
};
