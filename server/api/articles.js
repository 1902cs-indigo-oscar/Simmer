const router = require("express").Router();
const { Article, User, Ingredient } = require("../db/models");
const scraperObj = require("../scraping");
// const unirest = require("unirest");
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
      // const newArticle = {
      //   url: req.body.url,
      //   site: req.body.site,
      //   title: req.body.title,
      //   author: req.body.author,
      //   ingredients: req.body.ingredients,
      //   instructions: req.body.instructions,
      //   imageUrl: req.body.imageUrl,
      //   tags: req.body.tags,
      //   misc: req.body.misc,
      //   userId: req.user.id,
      // };
      // const createdArticle = await Article.create(newArticle);
      let createdArticle = await Article.findOne({
        where: {
          url: req.body.url
        }
      });
      if (!createdArticle) {
        createdArticle = await Article.create(newArticle);
      }
      createdArticle.addUser(req.user.id);
      newArticle.ingredients.forEach(async ingredient => {
        const newIngred = await Ingredient.create({ text: ingredient });
        createdArticle.addIngredient(newIngred.id);
      });
      //BELOW IS USING GOOGLES LANGUAGE API
      // newArticle.ingredients.forEach(async ingredient => {
      //   let analysis = await unirest
      //     .post(
      //       `https://language.googleapis.com/v1/documents:analyzeSyntax?key=${
      //         process.env.GOOGLE_LANGUAGE_API
      //       }`
      //     )
      //     .headers({
      //       "content-type": "application/json"
      //     })
      //     .send({
      //       document: {
      //         type: "PLAIN_TEXT",
      //         content: ingredient
      //       }
      //     });
      //   let keywords = [];
      //   analysis.body.tokens.forEach(word => {
      //     if (
      //       ["ROOT", "DOBJ", "POBJ", "AMOD"].includes(word.dependencyEdge.label)
      //     ) {
      //       keywords.push(word.text.content.toLowerCase());
      //     }
      //   });
      //   keywords = keywords.join(" ");
      //   let newKeyword = await Keyword.findOrCreate({
      //     where: { name: keywords }
      //   });
      //   createdArticle.addKeyword(newKeyword[0].dataValues.id);
      // });
      //END GOOGLE API BLOCK
      res.json(createdArticle);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:articleId", async (req, res, next) => {
  try {
    if (req.user) {
      const id = Number(req.params.articleId);
      console.log("id in route", id);
      const article = await Article.findByPk(id, {
        include: [{ model: Ingredient }]
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
      const existingArticle = await Article.findOne({
        where: {
          url
        }
      });
      if (existingArticle) {
        await req.user.addArticle(existingArticle);
        res.sendStatus(204);
      } else {
        const newArticle = await Article.create({
          url,
          site,
          title,
          author,
          ingredients,
          instructions,
          imageUrl,
          tags,
          misc
        });
        await req.user.addArticle(newArticle);
        res.sendStatus(204);
      }
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
      const {id} = req.user
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
              }
            ]
          }
        ]
      });
      let articles = ingredArray.map(ingred => {
        console.log(ingred)
        return ingred.article
      });
      const articlesByTitle = await Article.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.params.word}%`
          }
        }
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
      res.json(filteredArticles);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
