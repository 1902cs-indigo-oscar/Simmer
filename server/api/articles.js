const router = require("express").Router();
const { Article, User } = require("../db/models");
const scraperObj = require("../scraping");
module.exports = router;

router.all("*", async (req, res, next) => {
  if (!req.user){
    res.sendStatus(401)
  }
})

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const articles = await Article.findAll({
        include: [{
          model: User,
          where: {
            id: req.user.id
          }
        }]
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
      if (!createdArticle){
        createdArticle = await Article.create(newArticle);
      }
      //Need to figure out why findOrCreate is not working for the above
      createdArticle.addUser(req.user.id);
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
      console.log("id in route", id)
      const article = await Article.findByPk(id);
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
      await Article.destroy({
        where: {
          id: req.params.articleId,
          userId: req.user.id
        }
      });
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
    url, site, title, author, ingredients,
    instructions, imageUrl, tags, misc
  } = req.body
  if (url && site && title && ingredients && instructions){
    try {
      const existingArticle = await Article.findOne({
        where: {
          url
        }
      })
      if (existingArticle){
        await req.user.addArticle(existingArticle)
        res.sendStatus(204)
      }
      else {
        const newArticle = await Article.create({
          url, site, title, author, ingredients,
          instructions, imageUrl, tags, misc
        })
        await req.user.addArticle(newArticle)
        res.sendStatus(204)
      }
    }
    catch (err){
      next(err)
    }
  }
  else {
    res.sendStatus(400)
  }
})
