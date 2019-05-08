const User = require("./user");
const Article = require("./article");
const Keyword = require("./keyword");

User.belongsToMany(Article, { through: "user-article" });
Article.belongsToMany(User, { through: "user-article" });
Article.belongsToMany(Keyword, { through: "article-keyword" });
Keyword.belongsToMany(Article, { through: "article-keyword" });

module.exports = {
  User,
  Article,
  Keyword
};
