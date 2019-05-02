const router = require('express').Router();
const { Article } = require('../db/models');
const scraperObj = require('../scraping')
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('Hit Me');
    if (req.user) {
      const articles = await Article.findAll({
        where: { userId: req.user.id },
      });
      res.json(articles);
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      let urlTail = req.body.url.split('www.')[1]
      const urlBase = urlTail.split('.com')[0]
      const newArticle = scraperObj[urlBase]
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
      const createdArticle = await Article.create(newArticle);
      res.json(createdArticle);
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get('/:articleId', async (req, res, next) => {
  try {
    if (req.user) {
      const id = Number(req.params.articleId);
      const article = await Article.findByPk(id);
      res.json(article);
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.delete('/:articleId', async (req, res, next) => {
  try {
    if (req.user) {
      await Article.destroy({
        where: {
          id: req.params.articleId,
          userId: req.user.id,
        },
      });
      res.sendStatus(204);
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
