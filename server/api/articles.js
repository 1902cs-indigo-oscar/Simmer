const router = require("express").Router();
const { Article, User, Ingredient } = require("../db/models");
const scraperObj = require("../scraping");
const { Op } = require("sequelize");
module.exports = router;

router.all("*", async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const articles = await Article.findAll({
        include: [
          {
            model: User,
            where: {
              id: req.user.id
            }
          }
        ]
      });
      res.json(articles);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.user) {
      let urlTail = req.body.url.split("www.")[1];
      const urlBase = urlTail.split(".com")[0];
      const newArticle = await scraperObj[urlBase](req.body.url);
      let createdArticle = await Article.findOne({
        where: {
          url: req.body.url
        }
      });
      if (!createdArticle) {
        createdArticle = await Article.create(newArticle);
        newArticle.ingredients.forEach(async ingredient => {
          const newIngred = await Ingredient.create({ text: ingredient });
          createdArticle.addIngredient(newIngred.id);
        });
      }
      await createdArticle.addUser(req.user.id);
      const { id } = createdArticle;
      const finalArticle = await Article.findByPk(id, {
        include: [
          {
            model: User,
            through: {
              attributes: ["userId"],
              where: {
                userId: req.user.id
              }
            }
          },
          { model: Ingredient }
        ]
      });
      res.json(finalArticle);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/recommendations", async (req, res, next) => {
  try {
    if (req.user) {
      const usersArticles = await Article.findAll({
        include: [
          {
            model: User,
            where: {
              id: req.user.id
            }
          }
        ]
      });
      const usersArticlesId = [];
      usersArticles.forEach(
        article => (usersArticlesId[article.id] = article.id)
      );
      const linkedUsers = await User.findAll({
        where: {
          id: {
            [Op.ne]: req.user.id
          }
        },
        include: [
          {
            model: Article,
            where: {
              id: {
                [Op.in]: usersArticlesId
              }
            }
          }
        ]
      });
      const linkedUsersId = linkedUsers.map(user => user.id);
      const articles = await Article.findAll({
        include: [
          {
            model: User,
            where: {
              id: {
                [Op.in]: linkedUsersId
              }
            }
          }
        ]
      });
      const recommendations = [];
      articles.map(article => {
        if (!usersArticlesId[article.id]) {
          let updatedArticle = { ...article.dataValues, users: [] };
          recommendations.push(updatedArticle);
        }
      });
      res.json(recommendations);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:articleId", async (req, res, next) => {
  try {
    if (req.user) {
      const id = Number(req.params.articleId);
      const article = await Article.findByPk(id, {
        include: [
          { model: Ingredient },
          {
            model: User,
            through: {
              attributes: ["userId"],
              where: {
                userId: req.user.id
              }
            }
          }
        ]
      });
      res.json(article);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:articleId", async (req, res, next) => {
  try {
    if (req.user) {
      const id = Number(req.params.articleId);
      const article = await Article.findByPk(id);
      article.removeUser(req.user.id);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/scraped", async (req, res, next) => {
  const {
    url,
    site,
    title,
    author,
    ingredients,
    instructions,
    imageUrl,
    tags,
    misc
  } = req.body;
  if (url && site && title && ingredients && instructions) {
    try {
      let createdArticle = await Article.findOne({
        where: {
          url: req.body.url
        }
      });
      if (!createdArticle) {
        createdArticle = await Article.create({
          url,
          site,
          title,
          author,
          instructions,
          imageUrl,
          tags,
          misc
        });
        ingredients.forEach(async ingredient => {
          const newIngred = await Ingredient.create({ text: ingredient });
          createdArticle.addIngredient(newIngred.id);
        });
      }
      await createdArticle.addUser(req.user.id);
      const { id } = createdArticle;
      const finalArticle = await Article.findByPk(id, {
        include: [
          {
            model: User,
            through: {
              attributes: ["userId"],
              where: {
                userId: req.user.id
              }
            }
          },
          { model: Ingredient }
        ]
      });
      res.json(finalArticle);
    } catch (err) {
      next(err);
    }
  } else {
    res.sendStatus(400);
  }
});

router.get("/search/:word", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const ingredArray = await Ingredient.findAll({
        where: {
          text: {
            [Op.iLike]: `%${req.params.word}%`
          }
        },
        include: [
          {
            model: Article,
            as: "article",
            include: [
              {
                model: User,
                through: {
                  attributes: ["userId"],
                  where: {
                    userId: id
                  }
                }
              }
            ]
          }
        ]
      });
      let articles = ingredArray.map(ingred => {
        return ingred.article;
      });
      const articlesByTitle = await Article.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${req.params.word}%`
              }
            },
            {
              tags: {
                [Op.overlap]: [req.params.word.toLowerCase()]
              }
            }
          ]
        },
        include: [
          {
            model: User,
            through: {
              attributes: ["userId"],
              where: {
                userId: id
              }
            }
          }
        ]
      });
      articles = articles.concat(articlesByTitle);
      let uniqueArticle = {};
      let filteredArticles = [];
      articles.forEach(article => {
        if (!uniqueArticle[article.id]) {
          filteredArticles.push(article);
          uniqueArticle[article.id] = true;
        }
      });
      if (!filteredArticles.length) {
        throw new Error("No matching recipes");
      }
      res.json(filteredArticles);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
